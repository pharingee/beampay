'use strict';

angular
  .module('app')
  .controller('FooterCtrl', function ($scope, $state){

    if ($state.current.name === 'landing') {
      $scope.landing = true;
      $scope.about = false;
      $scope.faqs = false;
    } else if ($state.current.name === 'about') {
      $scope.landing = false;
      $scope.about = true;
      $scope.faqs = false;
    } else if ($state.current.name === 'faqs') {
      $scope.landing = false;
      $scope.about = false;
      $scope.faqs = true;
    }
  });
