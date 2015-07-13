'use strict';

angular
  .module('app')
  .controller('FooterCtrl', function ($scope, $state){

    if($state.current.name == 'landing'){
      $scope.landing = false;
      $scope.about = true;
    } else{
      $scope.landing = true;
      $scope.about = false;
    }
  });