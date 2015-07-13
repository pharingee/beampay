'use strict';

angular
  .module('app.airtime')
  .controller('AirtimeCtrl', function ($scope, $state, Transaction, $modal, STRIPE_KEY) {
    if ($state.current.name !== 'app.airtime.choose') {
      $state.transitionTo('app.airtime.choose');
    }

    $scope.details = {
      recipient: {}
    };
    $scope.details.serviceFee = 0;
    $scope.chooseState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    Transaction.getProfile().then(function (response) {
      if (!response.profile.informationComplete) {
        $modal.open({
          templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
          controller: 'IncompleteModalCtrl'
        });
      }
    }, function () {});

    var toCurr = function (amount) {
      return Math.ceil(amount * 100) / 100;
    };

    var validateDetails = function () {
      $scope.errors = [];

      if ($scope.details.network !== 'AIR' && $scope.details.network !== 'MTN' && $scope.details.network !== 'TIG' && $scope.details.network !== 'VOD') {
        $scope.errors.push('Please select an airtime provider');
        return false;
      }

      if(isNaN($scope.details.amountGhs) || parseInt($scope.details.amountGhs) < 5 || parseInt($scope.details.amountGhs > 1000)) {
        $scope.errors.push('Amount can only be more than GHS 5 and less than GHS 1000');
        return false;
      }

      return true;
    };

    var validateRecipient = function () {
      $scope.errors = [];

      if (!$scope.details.recipient.firstName || !$scope.details.recipient.lastName) {
        $scope.errors.push('Please enter first and last name of the recipient');
        return false;
      }

      if (!$scope.details.amountGhs) {
        $scope.errors.push('Please enter the amount to pay in Ghana Cedis');
        return false;
      }

      if (!$scope.details.recipient.phoneNumber || $scope.details.recipient.phoneNumber.length < 10) {
        $scope.errors.push('Please enter a valid phone number');
        return false;
      }

      return true;
    };

    $scope.reSavePayment = function () {
      if (!$scope.paymentSaveSuccess) {
        var payment = {
          stripeToken: $scope.stripeToken.id,
          transactionId: $scope.details.transactionId,
          type: 'AIRTIME'
        };
        Transaction.savePayment(payment).then(
          function() {
            $scope.paymentSaveSuccess = true;
            $modal.open({
              templateUrl: 'apps/transaction/views/successModal.html',
              controller: 'ModalCtrl'
            });
          }, function () {
            $scope.paymentSaveSuccess = false;
          });
      }
    };

    Transaction.getPricing().then(function (response){
      $scope.pricing = response;
    }, function(){

    });

    Transaction.getReferral().then(function (response){
      $scope.referral = response;
    }, function(){});

    $scope.calculatePricing = function () {
      $scope.details.amountUsd = toCurr($scope.details.amountGhs / $scope.pricing.usdGhs);
      $scope.details.serviceFee = toCurr(($scope.pricing.percentualFee * $scope.details.amountUsd) + $scope.pricing.fixedFee);
      $scope.details.chargeUsd = toCurr($scope.details.amountUsd + $scope.details.serviceFee);
    };

    $scope.setDetails = function () {
      if (validateDetails()) {
        $scope.recipientState = true;
        $state.transitionTo('app.airtime.recipient');
      }
    };

    $scope.addRecipient = function () {
      if (validateRecipient()){

        $scope.paymentState = true;
        $scope.details.phoneNumber = $scope.details.recipient.phoneNumber;

        if (!$scope.details.recipient.email) {
          delete $scope.details.recipient.email;
        }

        Transaction.addAirtime($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $state.transitionTo('app.airtime.payment');
        }, function (error) {
          if (error.detail && error.detail === '2') {
            $modal.open({
              templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
              controller: 'IncompleteModalCtrl'
            });
          }
        });
      }
    };

    $scope.getProvider = function () {
      if ($scope.details.network === 'MTN') {
        return 'MTN';
      }
      else if ($scope.details.network === 'TIG') {
        return 'TIGO';
      }
      else if ($scope.details.network === 'AIR'){
        return 'AIRTEL';
      }
      else{
      return 'VODAFONE';
    }
    };

    $scope.confirm = function () {
      if ($scope.pricing) {
        var handler = StripeCheckout.configure({
          key: STRIPE_KEY,
          image: '/icon-128.png',
          token: function(token) {
            $scope.stripeToken = token;
            var payment = {
              stripeToken: token.id,
              transactionId: $scope.details.transactionId,
              type: 'AIRTIME'
            };
            Transaction.savePayment(payment).then(
              function() {
                $scope.paymentSaveSuccess = true;
                $modal.open({
                  templateUrl: 'apps/transaction/views/successModal.html',
                  controller: 'ModalCtrl'
                });
              }, function () {
                $scope.paymentSaveSuccess = false;
              });
          }
        });

        handler.open({
          name: 'BeamPay',
          description: 'GHS ' + $scope.details.amountGhs + ' on ' + $scope.getProvider(),
          amount: $scope.details.chargeUsd * 100
        });
      }

      return false;
    };

  });
