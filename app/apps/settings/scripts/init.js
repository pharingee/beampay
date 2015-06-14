'use strict';

angular
  .module('app.settings', [])
  .config(function ($routeProvider) {
    var tempPrefix ='apps/settings/views/';

    $routeProvider
      .when('/settings/onboard/name', {
        templateUrl: tempPrefix + 'onboardName.html'
      })
      .when('/settings/onboard/address', {
        templateUrl: tempPrefix + 'onboardAddress.html'
      });
  });