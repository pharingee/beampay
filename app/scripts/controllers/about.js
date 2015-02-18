'use strict';

/**
 * @ngdoc function
 * @name valueApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the valueApp
 */
angular.module('valueApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
