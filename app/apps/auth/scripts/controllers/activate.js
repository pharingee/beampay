'use strict';

angular
  .module('app.auth')
  .controller('ActivateCtrl', function ($scope, $state, $routeParams, Auth, Error) {
    $scope.activate = {};
    var key = $routeParams.key;
    if (key) {
      Auth.activate(key)
        .then(function () {
          $state.transitionTo('home');
        }, function (data) {
          $scope.activate.errors = Error.activate(data);
        });
    } else {
      $state.transitionTo('landing');
    }

  });
