'use strict';

angular
  .module('app.valet', [])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {
    var tempPrefix = 'apps/valet/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app.valet', {
        url: '^/valet',
        templateUrl: tempPrefix + 'layouts/valet.html'
      })
      .state('app.valet.details', {
        url: '/details',
        templateUrl: tempPrefix + 'details.html',
        data: {
          pageTitle: 'Valet Details'
        }
      })
      .state('app.valet.recipient', {
        url: '/recipient',
        templateUrl: 'apps/transaction/views/recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      ;
  });
