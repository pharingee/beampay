'use strict';

angular
  .module('app.school', [])
  .config(function ($stateProvider, $urlMatcherFactoryProvider) {
    var tempPrefix = 'apps/school/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app.school', {
        url: '^/school',
        templateUrl: tempPrefix + 'layouts/school.html'
      })
      .state('app.school.details', {
        url: '/details',
        templateUrl: tempPrefix + 'details.html',
        data: {
          pageTitle: 'Choose Service'
        }
      })
      .state('app.school.contact', {
        url: '/contact',
        templateUrl: tempPrefix + 'contact.html',
        data: {
          pageTitle: 'contact Details'
        }
      })
      .state('app.school.recipient', {
        url: '/recipient',
        templateUrl: 'apps/transaction/views/recipient.html',
        data: {
          pageTitle: 'Confirm Request'
        }
      })
      ;
  });
