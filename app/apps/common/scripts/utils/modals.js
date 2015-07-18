'use strict';

angular
  .module('app.utils')
  .controller('DismissModalCtrl', function ($scope, $modalInstance, message) {
    $scope.message = message;

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  })
  .controller('AppRedirectModalCtrl', function ($scope, $modalInstance, $state, message) {
    $scope.message = message;

    $modalInstance.result.then(function () {}, function () {
      $state.transitionTo('app');
    });

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
