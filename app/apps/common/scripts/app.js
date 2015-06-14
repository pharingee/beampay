'use strict';

angular
  .module('app', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'app.config',
    'app.general',
    'app.auth',
    'app.transaction',
    'app.settings'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function ($rootScope, $anchorScroll) {
    // Scroll to top on all new pages
    $rootScope.$on('$routeChangeSuccess', function() {
      $anchorScroll();
    });

    // Initialise Wow.js
    new WOW().init();
  });
