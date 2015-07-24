'use strict';

angular
  .module('app.auth')
  .controller('ResetPasswordCtrl', function ($scope, $state, $stateParams, Settings, Error) {
    var key = $stateParams.key;

    if (key) {
      $scope.resetPassword = {};
      Settings.showResetPassword(key)
        .then(function () {
          $scope.resetPassword.can = true;
        }, function () {
          $scope.resetPassword.cannot = true;
        });

      $scope.resetPassword.submit = function () {
        // Reset
        $scope.resetPassword.errors = [];
        var pass1 = $scope.resetPassword.pass1;
        var pass2 = $scope.resetPassword.pass2;

        // Client checks
        if (!pass1 || !pass2) {
          $scope.resetPassword.errors.push('All fields required');
          return;
        }

        if (pass1 !== pass2) {
          $scope.resetPassword.errors.push('Passwords don\'t match');
          return;
        }
        $scope.laddaPass = true;
        // Server Request
        Settings.resetPassword(key, pass1, pass2)
          .then(function () {
            $scope.resetPassword.success = true;
            $scope.laddaPass = false;
          }, function (data) {
            $scope.resetPassword.errors = Error.resetPassword(data);
            $scope.laddaPass = false;
          });
        };
    } else {
      $state.transitionTo('landing');
    }

  });
