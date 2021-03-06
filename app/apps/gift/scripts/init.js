'use strict';

angular
  .module('app.gift', [])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {
    var tempPrefix = 'apps/gift/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app.gift', {
        url: '^/gift',
        templateUrl: tempPrefix + 'layouts/gift.html'
      })
      .state('app.gift.details', {
        url: '/details',
        templateUrl: tempPrefix + 'details.html',
        data: {
          pageTitle: 'Gift Details'
        }
      })
      .state('app.gift.recipient', {
        url: '/recipient',
        templateUrl: 'apps/transaction/views/recipient.html',
        data: {
          pageTitle: 'Recipient Details'
        }
      })
      ;
  });
