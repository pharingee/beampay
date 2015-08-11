'use strict';

angular
  .module('app.auth')
  .controller('ForgotCtrl', function ($scope, Settings, Error) {

    $scope.forgot = {};
    $scope.forgot.submit = function () {
      // Reset
      $scope.forgot.errors = {};
      var email = $scope.forgot.email;

      // Client checks
      if (!email) {
        $scope.forgot.errors.email = 'Email required';
        return;
      }
      $scope.laddaForgot = true;
      // Server Request
      Settings.requestResetPassword(email)
        .then(function () {
          $scope.forgot.email = email;
          $scope.forgot.success = true;
          $scope.laddaForgot = false;
        }, function (data) {
          $scope.laddaForgot = false;
          $scope.forgot.errors = Error.forgot(data);
        });
    };

  });
