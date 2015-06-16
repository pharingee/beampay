'use strict';

angular
  .module('app.auth')
  .controller('ChangeEmailCtrl', function ($scope, Settings, Error) {

    $scope.changeEmail = {};
    $scope.changeEmail.submit = function () {
      // Reset
      $scope.changeEmail.errors = [];
      var email = $scope.changeEmail.email;

      // Client checks
      if (!email) {
        $scope.changeEmail.errors.push('Email required');
        return;
      }

      // Server Request
      Settings.changeEmail(email)
        .then(function () {
          $scope.changeEmail.success = true;
        }, function (data) {
          $scope.changeEmail.errors = Error.changeEmail(data);
        });
    };

  });
