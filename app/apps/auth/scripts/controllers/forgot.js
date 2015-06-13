'use strict';

angular
  .module('app.auth')
  .controller('ForgotCtrl', function ($scope, $location, $window, Settings, Error) {

    $scope.forgot = {};
    $scope.forgot.submit = function () {
      // Reset
      $scope.forgot.errors = [];
      var email = $scope.forgot.email;

      // Client checks
      if (!email) {
        $scope.forgot.errors.push('Email required');
        return;
      }

      // Server Request
      Settings.requestResetPassword(email)
        .then(function () {
          $scope.forgot.email = email;
          $scope.forgot.success = true;
        }, function (data) {
          $scope.forgot.errors = Error.forgot(data);
        });
    };

  });
