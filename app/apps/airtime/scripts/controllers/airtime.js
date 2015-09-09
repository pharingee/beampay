'use strict';

angular
  .module('app.airtime')
  .controller('AirtimeCtrl', function ($scope, $state, Transaction, TransactionUtil, Error) {
    if ($state.current.name !== 'app.airtime.choose') {
      $state.transitionTo('app.airtime.choose');
    }

    var validateDetails = function () {
      $scope.errors = {};

      if ($scope.details.provider !== $scope.airtelProvider && $scope.details.provider !== $scope.mtnProvider && $scope.details.provider !== $scope.tigoProvider && $scope.details.provider !== $scope.vodafoneProvider) {
        $scope.errors.provider = 'Please select an airtime provider';
        return false;
      }

      return true;
    };

    $scope.details = {
      recipient: {},
      amountGhs: '5'
    };
    $scope.details.serviceFee = 0;
    $scope.chooseState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;
    $scope.transactionType = 'AIRTIME';

    $scope.mtnProvider = 'MTN';
    $scope.airtelProvider = 'AIR';
    $scope.tigoProvider = 'TIG';
    $scope.vodafoneProvider = 'VOD';

    $scope.providerProperties = {};
    $scope.providerProperties[$scope.mtnProvider] = {
      logo: 'apps/airtime/images/mtn.png'
    };
    $scope.providerProperties[$scope.airtelProvider] = {
      logo: 'apps/airtime/images/airtel.png'
    };
    $scope.providerProperties[$scope.tigoProvider] = {
      logo: 'apps/airtime/images/tigo.png'
    };
    $scope.providerProperties[$scope.vodafoneProvider] = {
      logo: 'apps/airtime/images/vodafone.png'
    };

    Transaction.getTransactionSetup().then(
      function (response){
        $.extend($scope, TransactionUtil.setupInstaPayTransaction(response));
        $scope.calculatePricing();
      }, function(){});

    $scope.calculatePricing = function () {
      $.extend($scope.details, TransactionUtil.calculateAirtimePricing($scope.details.amountGhs, $scope.pricing));
    };

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.airtime.recipient');
      }
    };

    $scope.addRecipient = function () {
      $scope.errors = {};
      $scope.errors = TransactionUtil.validateRecipient($scope.details);
      if ($.isEmptyObject($scope.errors)){
        $scope.laddaAddTxn = true;
        $scope.paymentState = true;
        $scope.details.phoneNumber = $scope.details.recipient.phoneNumber;
        $scope.details.network = $scope.details.provider;

        if (!$scope.details.recipient.email) {
          delete $scope.details.recipient.email;
        }

        Transaction.addAirtime($scope.details).then(function (response) {
          $scope.laddaAddTxn = false;
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          $scope.longDescription = TransactionUtil.getDescription({
            transactionType: 'airtimetopup',
            data: $scope.details
          });
          $state.transitionTo('app.airtime.payment');
        }, function (error) {
          $scope.laddaAddTxn = false;
          $scope.errors = Error.transaction(error.data, error.status);
        });
      }
    };

    $scope.getProvider = function () {
      return TransactionUtil.getFullName($scope.details.provider);
    };

    $scope.confirm = function () {
      if ($scope.pricing) {
        $scope.laddaPay = true;
        var description = 'GHS ' + $scope.details.amountGhs + ' ' + $scope.getProvider() + ' airtime (Ref. No.: ' + $scope.details.referenceNumber + ')';
        var amount = $scope.details.chargeUsd * 100;
        TransactionUtil.makePayment(description, amount, $scope.email).then(
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
                TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType, 'apps/airtime/views/successModal.html');
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
