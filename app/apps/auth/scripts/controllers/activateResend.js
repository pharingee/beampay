'use strict';

angular
  .module('app.auth')
  .controller('ActivateResendCtrl', function ($state, $scope, Auth, Error, Persist) {
    if (!Persist.getEmail()) {
      $state.transitionTo('signin');
    }

    $scope.activateResend = {};
    $scope.activateResend.submit = function () {
      Auth.activateResend()
        .then(function () {
          $scope.activateResend.success = true;
        }, function (data) {
          $scope.activateResend.errors = Error.activateResend(data);
        });
    };

  });
