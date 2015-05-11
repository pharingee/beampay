'use strict';

angular
  .module('beampayApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',

    // User apps
    'beampayApp.general'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'apps/general/views/landing/landing.html'
      })
      .when('/how', {
        templateUrl: 'apps/general/views/hiw/hiw.html'
      })
      .when('/about', {
        templateUrl: 'apps/general/views/about/about.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

angular
  .module('beampayApp').run(function ($rootScope, $anchorScroll) {
    // Scroll to top
    $rootScope.$on('$routeChangeSuccess', function() {
      $anchorScroll();
    });

    // Initialise Wow.js
    new WOW().init();
  });
