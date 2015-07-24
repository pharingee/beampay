'use strict';

angular
  .module('app.internet')
  .controller('InternetCtrl', function ($scope, $state, Transaction, TransactionUtil, Error) {
    if ($state.current.name !== 'app.internet.choose') {
      $state.transitionTo('app.internet.choose');
    }

    var validateDetails = function () {
      $scope.errors = [];

      if ($scope.details.billType !== $scope.surflineProvider && $scope.details.billType !== $scope.vodafoneProvider) {
        $scope.errors.push('Please select an Internet service provider');
        return false;
      }

      if (!$scope.details.amountGhs) {
        $scope.errors.push('Please enter the amount to pay in Ghana Cedis');
        return false;
      }

      if(isNaN($scope.details.amountGhs) || parseInt($scope.details.amountGhs) < 10 || parseInt($scope.details.amountGhs > 1000)) {
        $scope.errors.push('Amount can only be more than GHS 10 and less than GHS 1000');
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

    $scope.vodafoneProvider = 'VOB';
    $scope.surflineProvider = 'SRF';

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
    }, function(){});

    // $scope.reSavePayment = function () {
    //   if (!$scope.paymentSaveSuccess) {
    //     var payment = {
    //       stripeToken: $scope.paymentToken.id,
    //       transactionId: $scope.details.transactionId,
    //       type: $scope.transactionType
    //     };
    //     Transaction.savePayment(payment).then(
    //       function() {
    //         $scope.paymentSaveSuccess = true;
    //         TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType);
    //       }, function (error) {
    //         $scope.paymentSaveSuccess = false;
    //         $scope.errors = Error.payment(error.data, error.status);
    //       });
    //   }
    // };

    $scope.calculatePricing = function () {
      var results = TransactionUtil.calculatePricing($scope.details.amountGhs, $scope.pricing);
      $scope.details.amountUsd = results.amountUsd;
      $scope.details.serviceFee = results.serviceFee;
      $scope.details.chargeUsd = results.chargeUsd;
    };

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.internet.recipient');
      }
    };

    $scope.addRecipient = function () {
      $scope.errors = [];
      var error = TransactionUtil.validateRecipient($scope.details);
      if (!error){
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
          $state.transitionTo('app.internet.payment');
        }, function (error) {
          $scope.laddaAddTxn = false;
          $scope.errors = Error.transaction(error.data, error.status);
        });
      } else {
        $scope.errors.push(error);
      }
    };

    $scope.getProvider = function () {
      if ($scope.details.billType === $scope.surflineProvider) {
        return 'Surfline';
      }
      return 'Vodafone';
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
            console.log('Error');
          });
      }
    };

  });
