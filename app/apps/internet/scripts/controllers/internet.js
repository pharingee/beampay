'use strict';

angular
  .module('app.internet')
  .controller('InternetCtrl', function ($scope, $state, Transaction, TransactionUtil, Error) {
    if ($state.current.name !== 'app.internet.choose') {
      $state.transitionTo('app.internet.choose');
    }

    var validateDetails = function () {
      $scope.errors = {};

      if ($scope.details.billType !== $scope.surflineProvider && $scope.details.billType !== $scope.vodafoneProvider) {
        $scope.errors.billType = 'Please select an Internet service provider';
        return false;
      }

      return true;
    };

    $scope.details = {
      recipient: {},
      amountGhs: '125'
    };
    $scope.details.serviceFee = 0;
    $scope.chooseState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;
    $scope.transactionType = 'BILL';

    $scope.vodafoneProvider = 'VOB';
    $scope.surflineProvider = 'SRF';

    Transaction.getTransactionSetup().then(
      function (response){
        $.extend($scope, TransactionUtil.setupInstaPayTransaction(response));
        $scope.calculatePricing();
      }, function(){});

    $scope.calculatePricing = function () {
      $.extend($scope.details, TransactionUtil.calculateBillPricing($scope.details.amountGhs, $scope.pricing));
    };

    $scope.changeBillType = function () {
      if ($scope.details.billType === $scope.vodafoneProvider) {
        $scope.details.amountGhs = '70';
      } else {
        $scope.details.amountGhs = '125';
      }
      $scope.calculatePricing();
    };

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.internet.recipient');
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
          $state.transitionTo('app.internet.payment');
        }, function (error) {
          $scope.laddaAddTxn = false;
          $scope.errors = Error.transaction(error.data, error.status);
        });
      }
    };

    $scope.getProvider = function () {
      return TransactionUtil.getFullName($scope.details.billType);
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
