'use strict';

angular
  .module('app.transaction', [])
  .config(function ($routeProvider) {
    var tempPrefix = 'apps/transaction/views/';

    $routeProvider
      .when('/home', {
        templateUrl: tempPrefix + 'home.html'
      });
  });
