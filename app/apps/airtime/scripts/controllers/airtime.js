'use strict';

angular
  .module('app.airtime')
  .controller('AirtimeCtrl', function ($scope, $state, Transaction, TransactionUtil, Error) {
    if ($state.current.name !== 'app.airtime.choose') {
      $state.transitionTo('app.airtime.choose');
    }

    var validateDetails = function () {
      $scope.errors = [];

      if ($scope.details.network !== $scope.airtelProvider && $scope.details.network !== $scope.mtnProvider && $scope.details.network !== $scope.tigoProvider && $scope.details.network !== $scope.vodafoneProvider) {
        $scope.errors.push('Please select an airtime provider');
        return false;
      }

      if(isNaN($scope.details.amountGhs) || parseInt($scope.details.amountGhs) < 5 || parseInt($scope.details.amountGhs > 1000)) {
        $scope.errors.push('Amount can only be more than GHS 5 and less than GHS 1000');
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
    $scope.transactionType = 'AIRTIME';

    $scope.mtnProvider = 'MTN';
    $scope.airtelProvider = 'AIR';
    $scope.tigoProvider = 'TIG';
    $scope.vodafoneProvider = 'VOD';

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
      var results = TransactionUtil.calculatePricing($scope.details.amountGhs, $scope.pricing);
      $scope.details.amountUsd = results.amountUsd;
      $scope.details.serviceFee = results.serviceFee;
      $scope.details.chargeUsd = results.chargeUsd;
    };

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.airtime.recipient');
      }
    };

    $scope.addRecipient = function () {
      $scope.errors = [];
      var error = TransactionUtil.validateRecipient($scope.details);
      if (!error){
        $scope.paymentState = true;
        $scope.details.phoneNumber = $scope.details.recipient.phoneNumber;

        if (!$scope.details.recipient.email) {
          delete $scope.details.recipient.email;
        }

        Transaction.addAirtime($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          $state.transitionTo('app.airtime.payment');
        }, function (error) {
          $scope.errors = Error.transaction(error.data, error.status);
        });
      } else {
        $scope.errors.push(error);
      }
    };

    $scope.getProvider = function () {
      if ($scope.details.network === $scope.mtnProvider) {
        return 'MTN';
      }
      else if ($scope.details.network === $scope.tigoProvider) {
        return 'TIGO';
      }
      else if ($scope.details.network === $scope.airtelProvider){
        return 'AIRTEL';
      }
      else{
      return 'VODAFONE';
    }
    };

    $scope.confirm = function () {
      if ($scope.pricing) {
        var description = 'GHS ' + $scope.details.amountGhs + ' worth of ' + $scope.getProvider() + ' airtime';
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
                TransactionUtil.successModal($scope.details.referenceNumber, $scope.details.transactionId, $scope.transactionType);
              }, function (error) {
                $scope.paymentSaveSuccess = false;
                $scope.errors = Error.payment(error.data, error.status);
              });
          },
          function () {
            console.log('Error');
          });
      }
    };

  });
