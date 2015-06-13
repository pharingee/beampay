'use strict';

angular
.module('app')
.controller('HeaderCtrl', function ($scope, $location, Auth) {

    if (Auth.isLoggedIn()) {
      $scope.loggedin = true;
    } else {
      $scope.loggedin = false;
    }
    
    $scope.logoutInProgress = false;

    $scope.logout = function () {
      $scope.logoutInProgress = true;
      
      Auth.logout().then(function () {
        $scope.logoutInProgress = false;
        $scope.loggedin = false;
        $location.path('/');
      });
    };

    $scope.signup= function () {
      $location.path('/auth/signup/');
    };

    $scope.signin = function () {
      $location.path('/auth/signin/');
    };
  });