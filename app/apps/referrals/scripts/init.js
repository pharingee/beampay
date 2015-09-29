'use strict';

angular
  .module('app.referrals', [])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {
    var tempPrefix = 'apps/referrals/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app.referrals', {
        url: '^/referrals',
        templateUrl: tempPrefix + 'layouts/referrals.html',
        data: {
          pageTitle: 'Referrals'
        }
      })
      ;
  });
