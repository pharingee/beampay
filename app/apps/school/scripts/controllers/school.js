'use strict';

angular
  .module('app.school')
  .controller('SchoolCtrl', function ($scope, $state, $modal, Transaction) {
    if ($state.current.name !== 'app.school.details') {
      $state.transitionTo('app.school.details');
    }

    $scope.details = {
      wardName: {},
      recipient: {}
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
      $scope.recipientState = true;
      $state.transitionTo('app.school.recipient');
    };

    $scope.makeTransaction = function () {
      $scope.details.wardName = $scope.details.wardName.firstName + ' ' + $scope.details.wardName.middleName + ' ' + $scope.details.wardName.lastName;

      if (!$scope.details.amountGhs) {
        delete $scope.details.amountGhs;
      }

      if (!$scope.details.recipient.email) {
        delete $scope.details.recipient.email;
      }
      Transaction.addSchool($scope.details).then(function (response) {
        $scope.details.transactionId = response.transactionId;
        $modal.open({
          templateUrl: 'apps/transaction/views/successModal.html',
          controller: 'ModalCtrl'
        });
      }, function (error) {
        if (error.detail && error.detail == '2') {
          $modal.open({
            templateUrl: 'apps/transaction/views/incompleteProfileModal.html',
            controller: 'ModalCtrl'
          });
        }
      });
    };

  });
