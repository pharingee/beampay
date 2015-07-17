'use strict';

angular
  .module('app.utility')
  .controller('UtilityCtrl', function ($scope, $state, Transaction, $modal, STRIPE_KEY) {
    if ($state.current.name !== 'app.utility.choose') {
      $state.transitionTo('app.utility.choose');
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

      if ($scope.details.billType !== 'ECG' && $scope.details.billType !== 'GWC') {
        $scope.errors.push('Please select a Utility service provider');
        return false;
      }

      if ($scope.details.accountNumber && $scope.details.accountNumber.toString().length < 13) {
        $scope.errors.push('Please enter a 13-digit account number');
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

    var validateRecipient = function () {
      $scope.errors = [];

      if (!$scope.details.recipient.firstName || !$scope.details.recipient.lastName) {
        $scope.errors.push('Please enter first and last name of the recipient');
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
          type: 'BILL'
        };
        Transaction.savePayment(payment).then(
          function() {
            $scope.paymentSaveSuccess = true;
            $modal.open({
              templateUrl: 'apps/transaction/views/successModal.html',
              controller: 'SuccessModalCtrl',
              resolve: {
                referenceNumber: function () {
                  return $scope.details.referenceNumber;
                },
                stateParams: function () {
                  return {
                    transactionId: $scope.details.transactionId,
                    transactionType: 'BILL'
                  };
                }
              }
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
        $state.transitionTo('app.utility.recipient');
      }
    };

    $scope.addRecipient = function () {
      if (validateRecipient()){

        $scope.paymentState = true;
        if (!$scope.details.accountNumber) {
          delete $scope.details.accountNumber;
        }

        if (!$scope.details.recipient.email) {
          delete $scope.details.recipient.email;
        }

        Transaction.addBill($scope.details).then(function (response) {
          $scope.details.transactionId = response.transactionId;
          $scope.details.referenceNumber = response.referenceNumber;
          $state.transitionTo('app.utility.payment');
        }, function (error) {
          if (error.data.detail && error.data.detail === '2') {
            console.log(error);
            $modal.open({
              templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
              controller: 'IncompleteModalCtrl'
            });
          }
        });
      }
    };

    $scope.getProvider = function () {
      if ($scope.details.billType === 'ECG') {
        return 'Electricity';
      }
      return 'Water';
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
                  controller: 'SuccessModalCtrl',
                  resolve: {
                    referenceNumber: function () {
                      return $scope.details.referenceNumber;
                    },
                    stateParams: function () {
                      return {
                        transactionId: $scope.details.transactionId,
                        transactionType: 'BILL'
                      };
                    }
                  }
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
