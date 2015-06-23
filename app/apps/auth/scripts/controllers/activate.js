'use strict';

angular
  .module('app.auth')
  .controller('ActivateCtrl', function ($scope, $state, $stateParams, Auth, Error) {
    $scope.activate = {};
    var key = $stateParams.key;
    if (key) {
      Auth.activate(key)
        .then(function () {
          $state.transitionTo('onboard.name');
        }, function (data) {
          $scope.activate.errors = Error.activate(data);
        });
    } else {
      $state.transitionTo('landing');
    }

  });
