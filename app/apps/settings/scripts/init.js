'use strict';

angular
  .module('app.settings', [])
  .config(function ($stateProvider) {
    var tempPrefix ='apps/settings/views/';

    $stateProvider
      .state('settings.onboard', {
        url: '/settings/onboard',
        abstract: 'true',
        template: '<ui-view/>'
      })
      .state('settings.onboard.name', {
        url: '/settings/onboard/name',
        templateUrl: tempPrefix + 'onboardName.html',
        data: {
          pageTitle: 'Onboarding - Name'
        }
      })
      .state('settings.onboard.address', {
        url: '/settings/onboard/address',
        templateUrl: tempPrefix + 'onboardAddress.html',
        data: {
          pageTitle: 'Onboarding - Address'
        }
      });
  });
