'use strict';

angular
  .module('app.transaction', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/transaction/views/';

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: tempPrefix + 'home.html',
        data: {
          pageTitle: 'Welcome'
        }
      });
  });
