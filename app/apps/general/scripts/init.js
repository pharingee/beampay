'use strict';

angular
  .module('app.general', [])
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
