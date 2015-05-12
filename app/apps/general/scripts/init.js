(function() {
  'use strict';

  angular
    .module('beampayApp.general', [])
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
        });
    });
}());
