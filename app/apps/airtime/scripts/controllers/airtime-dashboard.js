'use strict';

angular
  .module('app.airtime')
  .controller('airtimeCtrl', function ($scope, Transaction) {

    var toCurr = function (amount) {
      return Math.ceil(amount * 100) / 100;
    };

    //store all form data in this object
    $scope.airtimeFormData = {
      recipient: {}
    };

    $scope.airtimeFormData.serviceFee = 0;

    Transaction.getPricing().then( function (response) {
      $scope.pricing = response;
    }, function () {});

    $scope.calculatePricing = function () {
      $scope.airtimeFormData.amountUsd = toCurr($scope.airtimeFormData.airtimeAmountGhs / $scope.pricing.usdGhs);
      $scope.airtimeFormData.serviceFee = toCurr(($scope.pricing.percentualFee * $scope.airtimeFormData.amountUsd) + $scope.pricing.fixedFee);
      $scope.airtimeFormData.chargeUsd = toCurr($scope.airtimeFormData.amountUsd + $scope.airtimeFormData.serviceFee);

    };

    $scope.getProvider = function () {
      if ($scope.airtimeFormData.network === 'MTN') {
        // $scope.airtimeFormData.networkImgUrl = "apps/airtime/images/mtn.png";
        return 'MTN';
      }
      else if ($scope.airtimeFormData.network === 'TIGO') {
        return 'TIGO';
      } 
      else if ($scope.airtimeFormData.network === 'AIRTEL'){
        return 'AIRTEL';
      } 
      else{
      return 'VODAFONE';
    }
    };



    // function to process the form
    // $scope.processAirtimeForm = function() {
    //   alert('awesome!');
    // };

    $scope.processAirtimeForm = function () {
      if ($scope.pricing) {
        var handler = StripeCheckout.configure({
          key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
          image: '/icon-128.png',
          token: function(token) {
            var payment = {
              stripeToken: token.id,
              transactionId: $scope.details.txnId,
              type: 'AIRTIME'
            }
            Transaction.savePayment(payment).then(
              function(response) {
                console.log(response);
              }, function () {});
          }
        });

        handler.open({
          name: 'BeamPay',
          description: 'GHS' + $scope.airtimeFormData.airtimeAmountGhs + 'airtime credit on ' + $scope.getProvider(),
          amount: $scope.airtimeFormData.airtimeAmountGhs
        });
      }

      return false;
    };
  });
