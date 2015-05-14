'use strict';

angular
  .module('app.general', [])
  .config(function ($routeProvider) {
    var tempPrefix = 'apps/general/views/';
    $routeProvider
      .when('/', {
        templateUrl: tempPrefix + 'landing/landing.html'
      })
      .when('/how', {
        templateUrl: tempPrefix + 'hiw/hiw.html'
      })
      .when('/about', {
        templateUrl: tempPrefix + 'about/about.html'
      });
  });
