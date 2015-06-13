'use strict';

angular
  .module('app.auth')
  .controller('ActivateCtrl', function ($scope, $location, $routeParams, Auth, Error) {
    $scope.activate = {};
    var key = $routeParams.key;
    console.log('here');
    if (key) {
      Auth.activate(key)
        .then(function () {
          $location.path('/home');
        }, function (data) {
          $scope.activate.errors = Error.activate(data);
        });
    } else {
      $location.path('/');
    }

  });
