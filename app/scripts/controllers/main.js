'use strict';

/**
 * @ngdoc function
 * @name valueApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the valueApp
 */
angular.module('valueApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
