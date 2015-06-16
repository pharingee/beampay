'use strict';

angular
  .module('app.auth')
  .controller('ConfirmEmailCtrl', function ($scope, $state, $stateParams, Settings, Error) {
    $scope.confirmEmail = {};
    var key = $stateParams.key;

    if (key) {
      Settings.confirmEmail(key)
        .then(function () {
          $scope.confirmEmail.success = true;
        }, function (data) {
          $scope.confirmEmail.errors = Error.confirmEmail(data);
        });
    } else {
      $state.transitionTo('landing');
    }

  });
