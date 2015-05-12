(function() {
  'use strict';

  angular
    .module('app', [
      'ngCookies',
      'ngResource',
      'ngRoute',
      'ngSanitize',
      'ngTouch',
      'ui.bootstrap',

      // User apps
      'app.general'
    ])
    .config(function ($routeProvider) {
      $routeProvider
        // Default Route
        .otherwise({
          redirectTo: '/'
        });
    });

  angular
    .module('app').run(function ($rootScope, $anchorScroll) {
      // Scroll to top on all new pages
      $rootScope.$on('$routeChangeSuccess', function() {
        $anchorScroll();
      });

      // Initialise Wow.js
      new WOW().init();
    });
}());
