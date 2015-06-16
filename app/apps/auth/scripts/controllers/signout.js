'use strict';

angular
  .module('app.auth')
  .controller('SignoutCtrl', function ($scope, $state, Auth) {

    $scope.signout = function () {
      Auth.signout().then(
        function () {
          $state.transitionTo('landing');
        }, function () {
          // Fail silently
          $state.transitionTo('landing');
        }
      );
    };

  });
