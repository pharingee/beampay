'use strict';

angular
  .module('app.general')
  .controller('SuccessModalCtrl', function ($scope, $modalInstance, $state, referenceNumber, stateParams) {
    $scope.referenceNumber = referenceNumber;

    $modalInstance.result.then(function () {}, function () {
      $state.transitionTo('app.transaction.details', stateParams);
    });

    $scope.cancel = function () {
      $modalInstance.dismiss();
      $state.transitionTo('app.transaction.details', stateParams);
    };
  });
