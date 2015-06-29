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



    // function to process the form
    $scope.processAirtimeForm = function() {
      alert('awesome!');
    };
  });
