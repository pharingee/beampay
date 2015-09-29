'use strict';

angular
  .module('app.general', [])
  .config(function ($urlMatcherFactoryProvider, $stateProvider) {
    var tempPrefix = 'apps/general/views/';
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('landing', {
        url: '/home',
        templateUrl: tempPrefix + 'landing/landing.html',
        data: {
          pageTitle: 'Beam - Care for loved ones in Ghana quickly and affordably'
        }
      })
      .state('hiw', {
        url: '/how',
        templateUrl: tempPrefix + 'hiw/hiw.html',
        data: {
          pageTitle: 'How it works'
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: tempPrefix + 'about/about.html',
        data: {
          pageTitle: 'About BeamPay'
        }
      })
      .state('faqs', {
        url: '/faqs',
        templateUrl: tempPrefix + 'faqs/faqs.html',
        data: {
          pageTitle: 'Frequently Asked Questions'
        }
      });
  });
