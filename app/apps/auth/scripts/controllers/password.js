'use strict';

angular
  .module('app.auth')
  .controller('PasswordCtrl', function ($scope, $location, $routeParams, Settings, Error) {

    $scope.password = {};
    Settings.isPassword()
      .then(function (data) {
        if (data) {
          $scope.password.passwordExists = true;
        } else {
          $scope.password.passwordNoExists = true;
        }
      }, function (data) {
        Error.isPassword(data);
      });

    $scope.changePassword = {};
    $scope.changePassword.submit = function () {
      // Reset
      $scope.changePassword.errors = [];
      var oldPass = $scope.changePassword.oldPass;
      var pass1 = $scope.changePassword.pass1;
      var pass2 = $scope.changePassword.pass2;

      // Client checks
      if (!oldPass || !pass1 || !pass2) {
        $scope.changePassword.errors.push('All fields required');
        return;
      }

      if (pass1 !== pass2) {
        $scope.changePassword.errors.push('New passwords don\'t match');
        return;
      }

      // Server Request
      Settings.changePassword(oldPass, pass1, pass2)
        .then(function () {
          $scope.changePassword.success = true;
        }, function (data) {
          $scope.changePassword.errors = Error.changePassword(data);
        });
      };

    $scope.setPassword = {};
    $scope.setPassword.submit = function () {
      // Reset
      $scope.setPassword.errors = [];
      var pass1 = $scope.setPassword.pass1;
      var pass2 = $scope.setPassword.pass2;

      // Client checks
      if (!pass1 || !pass2) {
        $scope.setPassword.errors.push('All fields required');
        return;
      }

      if (pass1 !== pass2) {
        $scope.setPassword.errors.push('Passwords don\'t match');
        return;
      }

      // Server Request
      Settings.setPassword(pass1, pass2)
        .then(function () {
          $scope.setPassword.success = true;
        }, function (data) {
          $scope.setPassword.errors = Error.setPassword(data);
        });
      };

  });
