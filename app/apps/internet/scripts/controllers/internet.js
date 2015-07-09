'use strict';

angular
  .module('app.internet')
  .controller('InternetCtrl', function ($scope, $state, Transaction, $modal, STRIPE_KEY) {
    if ($state.current.name !== 'app.internet.choose') {
      $state.transitionTo('app.internet.choose');
    }

    $scope.details = {
      recipient: {},
      accountNumber: '',
      preferredContactMethod: 'MAIL'
    };
    $scope.details.serviceFee = 0;
    $scope.chooseState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    var toCurr = function (amount) {
      return Math.ceil(amount * 100) / 100;
    };

    var validateDetails = function () {
      $scope.errors = [];

      if ($scope.details.billType !== 'SRF' && $scope.details.billType !== 'VOB') {
        $scope.errors.push('Please select an Internet service provider');
        return false;
      }

      if(isNaN($scope.details.amountGhs) || parseInt($scope.details.amountGhs) < 50 || parseInt($scope.details.amountGhs > 5000)) {
        $scope.errors.push('Amount can only be more than GHS 50 and less than GHS 5000');
        return false;
      }

      return true;
    };

    var validateRecipient = function () {
      $scope.errors = [];

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
          type: 'BILL'
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
        $state.transitionTo('app.internet.recipient');
      }
    };

    $scope.addRecipient = function () {
      if (validateRecipient()){

        $scope.paymentState = true;
        Transaction.addBill($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $state.transitionTo('app.internet.payment');
        }, function (error) {
          if (error.detail && error.detail == '2') {
            $modal.open({
              templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
              controller: 'ModalCtrl'
            });
          }
        });
      }
    };

    $scope.getProvider = function () {
      if ($scope.details.billType === 'SRF') {
        return 'Surfline';
      }
      return 'Vodafone';
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
              type: 'BILL'
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
