(function() {
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
        // Default Route
        .otherwise({
          redirectTo: '/'
        });
    });

  angular
    .module('beampayApp').run(function ($rootScope, $anchorScroll) {
      // Scroll to top on all new pages
      $rootScope.$on('$routeChangeSuccess', function() {
        $anchorScroll();
      });

      // Initialise Wow.js
      new WOW().init();
    });
}());
