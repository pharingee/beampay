'use strict';

angular
  .module('app.referrals', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/referrals/views/';

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
