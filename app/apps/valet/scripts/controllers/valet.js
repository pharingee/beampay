'use strict';

angular
  .module('app.valet')
  .controller('ValetCtrl', function ($scope, $state, Transaction) {
    if ($state.current.name !== 'app.valet.details') {
      $state.transitionTo('app.valet.details');
    }

    $scope.details = {
      wardName: {},
      preferredContactMethod: 'MAIL'
    };

    $scope.details.serviceFee = 0;
    $scope.detailsState = true;
    $scope.errors = [];
    $scope.paymentSaveSuccess = true;

    $scope.setDetails = function () {
      $scope.contactState = true;
      $state.transitionTo('app.valet.contact');
    };

    $scope.setMethod = function () {
      $scope.requestState = true;
      $state.transitionTo('app.valet.request');
    };

    $scope.makePayment = function () {
      $scope.details.wardName = $scope.details.wardName.firstName + ' ' + $scope.details.wardName.middleName + ' ' + $scope.details.wardName.lastName;
      Transaction.addvalet($scope.details).then(function (response) {
        $scope.details.transactionId = response.transactionId;
        $state.transitionTo('app.valet.success');
      }, function () {

      });
    };

  });
