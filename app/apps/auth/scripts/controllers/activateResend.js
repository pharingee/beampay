'use strict';

angular
  .module('app.auth')
  .controller('ActivateResendCtrl', function ($scope, $location, Auth, Error) {

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
