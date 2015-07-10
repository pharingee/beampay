'use strict';

angular
  .module('app.general')
  .controller('IncompleteModalCtrl', function ($scope, $modalInstance, $state) {
    $modalInstance.result.then(function () {}, function () {
      $state.transitionTo('onboard.name');
    });

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
