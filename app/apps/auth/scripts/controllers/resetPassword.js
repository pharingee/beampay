'use strict';

angular
  .module('app.auth')
  .controller('ResetPasswordCtrl', function ($scope, $location, $routeParams, Settings, Error) {
    var key = $routeParams.key;

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

        // Server Request
        Settings.resetPassword(key, pass1, pass2)
          .then(function () {
            $scope.resetPassword.success = true;
          }, function (data) {
            $scope.resetPassword.errors = Error.resetPassword(data);
          });
        };
    } else {
      $location.path('/');
    }

  });
