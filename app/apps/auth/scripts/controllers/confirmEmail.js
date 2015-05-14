'use strict';

angular
  .module('app.auth')
  .controller('ConfirmEmailCtrl', function ($scope, $location, $routeParams, Settings, Error) {
    $scope.confirmEmail = {};
    var key = $routeParams.key;

    if (key) {
      Settings.confirmEmail(key)
        .then(function () {
          $scope.confirmEmail.success = true;
        }, function (data) {
          $scope.confirmEmail.errors = Error.confirmEmail(data);
        });
    } else {
      $location.path('/');
    }

  });
