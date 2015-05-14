'use strict';

angular
  .module('app.auth')
  .controller('SignoutCtrl', function ($scope, $location, Auth) {

    $scope.signout = function () {
      Auth.signout().then(
        function () {
          $location.path('/');
        }, function () {
          // Fail silently
          $location.path('/').search('next', null);
        }
      );
    };

  });
