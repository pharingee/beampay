'use strict';

angular
  .module('app.school', [])
  .config(function ($stateProvider) {
    var tempPrefix = 'apps/school/views/';

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
      .state('app.school.request', {
        url: '/request',
        templateUrl: tempPrefix + 'request.html',
        data: {
          pageTitle: 'Confirm Request'
        }
      })
      .state('app.school.success', {
        url: '/success',
        templateUrl: tempPrefix + 'success.html',
        data: {
          pageTitle: 'Request Successful'
        }
      })
      ;
  });
