'use strict';

angular
  .module('app.school')
  .controller('SchoolCtrl', function ($scope, $state, Transaction) {
    if ($state.current.name !== 'app.school.details') {
      $state.transitionTo('app.school.details');
    }

    $scope.details = {
      wardName: {},
      preferredContactMethod: 'MAIL'
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    var toCurr = function (amount) {
      return Math.ceil(amount * 100) / 100;
    };

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
      $scope.contactState = true;
      $state.transitionTo('app.school.contact');
    };

    $scope.setMethod = function () {
      $scope.requestState = true;
      $state.transitionTo('app.school.request');
    };

    $scope.makePayment = function () {
      $scope.details.wardName = $scope.details.wardName.firstName + ' ' + $scope.details.wardName.middleName + ' ' + $scope.details.wardName.lastName;
      Transaction.addSchool($scope.details).then(function (response) {
        $scope.details.transactionId = response.transactionId;
        $state.transitionTo('app.school.success');
      }, function () {

      });
    };

  });
