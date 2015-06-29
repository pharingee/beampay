'use strict';

angular
  .module('app.television')
  .controller('TelevisionCtrl', function ($scope, $state, Transaction) {
    var toCurr = function (amount) {
      return Math.ceil(amount * 100) / 100;
    };

    var validateDetails = function () {
      if ($scope.details.billType !== 'DST' && $scope.details.billType !== 'GOT') {
        return true;
      }

      if ($scope.details.accountNumber.toString().length < 8 || isNaN($scope.details.accountNumber)) {
        return true;
      }

      if(isNaN($scope.details.amountGhs) || parseInt($scope.details.amountGhs) < 50 || parseInt($scope.details.amountGhs > 5000)) {
        return true;
      }
    }

    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      if (toState.name === 'app.television.recipient') {
        if ((fromState.name !== 'app.television.service') || (validateDetails())) {
          $state.transitionTo('app.television.service');
        }
      }

      if (toState.name === 'app.television.confirm') {
        if ((fromState.name !== 'app.television.recipient') || !($scope.details.txnId)) {
          $state.transitionTo('app.television.service');
        }
      }
    });

    $scope.details = {
      recipient: {},
      preferredContactMethod: 'MAIL',
      reference: 'Payment June'
    };
    $scope.details.serviceFee = 0;

    Transaction.getPricing().then(function (response){
      $scope.pricing = response;
    }, function(){

    });

    $scope.calculatePricing = function () {
      $scope.details.amountUsd = toCurr($scope.details.amountGhs / $scope.pricing.usdGhs);
      $scope.details.serviceFee = toCurr(($scope.pricing.percentualFee * $scope.details.amountUsd) + $scope.pricing.fixedFee);
      $scope.details.chargeUsd = toCurr($scope.details.amountUsd + $scope.details.serviceFee);
    };

    $scope.setDetails = function () {
      $state.transitionTo('app.television.recipient');
    };

    $scope.addRecipient = function () {
      Transaction.addBill($scope.details).then(function (response) {
          $scope.details.txnId = response.txnId;
          $state.transitionTo('app.television.confirm');
      }, function () {

      });
    };

    $scope.getProvider = function () {
      if ($scope.details.provider === 'DST') {
        return 'DSTV';
      }
      return 'GOTV';
    };

    $scope.confirm = function () {
      if ($scope.pricing) {
        var handler = StripeCheckout.configure({
          key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
          image: '/icon-128.png',
          token: function(token) {
            var payment = {
              stripeToken: token.id,
              transactionId: $scope.details.txnId,
              type: 'BILL'
            }
            Transaction.savePayment(payment).then(
              function(response) {
                console.log(response);
              }, function () {});
          }
        });

        handler.open({
          name: 'BeamPay',
          description: 'GHS ' + $scope.details.amountGhs + ' on ' + $scope.getProvider(),
          amount: $scope.details.amountGhs
        });
      }

      return false;
    };

  });
