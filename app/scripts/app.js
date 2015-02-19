'use strict';

/**
 * @ngdoc overview
 * @name valueApp
 * @description
 * # valueApp
 *
 * Main module of the application.
 */
angular
  .module('valueApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/landing/landing.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular
  .module('valueApp').run(function ($rootScope, $anchorScroll) {
    $rootScope.$on('$routeChangeSuccess', function() {
      $anchorScroll();
    });
  });
