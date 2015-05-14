'use strict';

angular
  .module('app', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'app.general',
    'app.auth',
    'app.transaction'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
    $httpProvider.interceptors.push('AuthInterceptor');
  })
  .run(function ($rootScope, $anchorScroll) {
    // Scroll to top on all new pages
    $rootScope.$on('$routeChangeSuccess', function() {
      $anchorScroll();
    });

    // Initialise Wow.js
    new WOW().init();
  })
  .constant('API_SERVER', 'http://localhost:5000/api/v1/');
  // .constant('API_SERVER', 'https://beampay-dev.herokuapp.com/api/v1/');
