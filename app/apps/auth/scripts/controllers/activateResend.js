'use strict';

angular
  .module('app.auth')
  .controller('ActivateResendCtrl', function ($state, $scope, Auth, Error, Persist) {
    if (!Persist.getEmail()) {
      $state.transitionTo('signin');
    }

    $scope.user = {
      email: Persist.getEmail()
    };

    $scope.activateResend = {};
    $scope.activateResend.submit = function () {
      $scope.laddaActivate = true;
      Auth.activateResend()
        .then(function () {
          $scope.activateResend.success = true;
          $scope.laddaActivate = false;
        }, function (data) {
          $scope.laddaActivate = false;
          $scope.activateResend.errors = Error.activateResend(data);
        });
    };

  });
