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
