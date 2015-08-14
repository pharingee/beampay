'use strict';

angular
  .module('app.television')
  .controller('TelevisionCtrl', function ($scope, $state, Transaction, TransactionUtil, Error) {
    if ($state.current.name !== 'app.television.choose') {
      $state.transitionTo('app.television.choose');
    }

    var validateDetails = function () {
      $scope.errors = {};

      if ($scope.details.billType !== $scope.dstvProvider && $scope.details.billType !== $scope.gotvProvider) {
        $scope.errors.billType = 'Please select a TV service provider';
        return false;
      }

      if ($scope.details.accountNumber && ($scope.details.accountNumber.toString().length < 8 || isNaN($scope.details.accountNumber))) {
        $scope.errors.accountNumber = 'The reference number has to be 8 digits long';
        return false;
      }

      if (!$scope.details.amountGhs) {
        $scope.errors.amountGhs = 'Please enter the amount to pay in Ghana Cedis';
        return false;
      }

      return true;
    };

    $scope.details = {
      recipient: {}
    };
    $scope.details.serviceFee = 0;
    $scope.chooseState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;
    $scope.transactionType = 'BILL';

    $scope.dstvProvider = 'DST';
    $scope.gotvProvider = 'GOT';

    Transaction.getProfile().then(function (response) {
      if (!response.profile.informationComplete) {
        Error.incompleteModal();
      } else {
        $scope.email = response.email;
      }
    }, function () {});

    Transaction.getPricing().then(function (response){
      $scope.pricing = response;
    }, function(error){
      $scope.errors = Error.pricing(error.data, error.status);
    });

    Transaction.getReferral().then(function (response){
      $scope.referral = response;
      $scope.pricing.freeTransactionNo = response.freeTransactionNo;
      $scope.calculatePricing();
    }, function(){});

    $scope.reSavePayment = function () {
      if (!$scope.paymentSaveSuccess) {
        var payment = {
          stripeToken: $scope.paymentToken.id,
          transactionId: $scope.details.transactionId,
          type: $scope.transactionType
        };
        Transaction.savePayment(payment).then(
          function() {
            $scope.paymentSaveSuccess = true;
            TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType);
          }, function (error) {
            $scope.paymentSaveSuccess = false;
            $scope.errors = Error.payment(error.data, error.status);
          });
      }
    };

    $scope.calculatePricing = function () {
      var results = TransactionUtil.calculateBillPricing($scope.details.amountGhs, $scope.pricing);
      $scope.details.amountUsd = results.amountUsd;
      $scope.details.serviceFee = results.serviceFee;
      $scope.details.chargeUsd = results.chargeUsd;
    };

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.television.recipient');
      }
    };

    $scope.addRecipient = function () {
      $scope.errors = TransactionUtil.validateRecipient($scope.details);
      if ($.isEmptyObject($scope.errors)){
        $scope.paymentState = true;

        if (!$scope.details.accountNumber) {
          delete $scope.details.accountNumber;
        }

        if (!$scope.details.recipient.email) {
          delete $scope.details.recipient.email;
        }

        $scope.laddaAddTxn = true;
        Transaction.addBill($scope.details).then(function (response) {
          $scope.laddaAddTxn = false;
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          $state.transitionTo('app.television.payment');
        }, function (error) {
          $scope.laddaAddTxn = false;
          $scope.errors = Error.transaction(error.data, error.status);
        });
      }
    };

    $scope.getProvider = function () {
      if ($scope.details.billType === $scope.dstvProvider) {
        return 'DSTV';
      }
      return 'GOTV';
    };

    $scope.confirm = function () {
      if ($scope.pricing) {
        $scope.laddaPay = true;
        var description = 'GHS ' + $scope.details.amountGhs + ' on ' + $scope.getProvider();
        var amount = $scope.details.chargeUsd * 100;
        TransactionUtil.makePayment(description, amount).then(
          function (token){
            var payment = {
              stripeToken: token.id,
              transactionId: $scope.details.transactionId,
              type: $scope.transactionType
            };

            $scope.paymentToken = token;
            Transaction.savePayment(payment).then(
              function() {
                $scope.paymentSaveSuccess = true;
                $scope.laddaPay = false;
                TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType);
              }, function (error) {
                $scope.paymentSaveSuccess = false;
                $scope.laddaPay = false;
                $scope.errors = Error.payment(error.data, error.status);
              });
          },
          function () {
            $scope.laddaPay = false;
          });
      }
    };

  });
