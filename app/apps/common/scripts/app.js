'use strict';

angular
  .module('app', [
    'ngCookies',
    'ngResource',
    // 'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'app.config',
    'app.general',
    'app.auth',
    'app.transaction',
    'app.settings'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
  })

  .run(function ($rootScope, $anchorScroll) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      //Set page title
      if (angular.isDefined(toState.data.pageTitle)) {
        if (angular.isDefined(toState.data.pageSubtitle)) {
          $rootScope.pageTitle = toState.data.pageSubtitle + ' :: ' + toState.data.pageTitle + ' | BeamPay' ;
        } else {
          $rootScope.pageTitle = toState.data.pageTitle + ' | BeamPay' ;
        }
      }

      // Scroll to top on all new pages
      $anchorScroll();
    });

    // Initialise Wow.js
    new WOW().init();
  });
