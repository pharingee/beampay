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
    'app.utils',
    'app.general',
    'app.auth',
    'app.transaction',
    'app.settings',
    'app.airtime',
    'app.television'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.hashPrefix('!');
    $urlRouterProvider.otherwise('/');
  })

  .run(function ($rootScope, $anchorScroll, Auth, $state) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
      //Set page title
      if (angular.isDefined(toState.data.pageTitle)) {
        if (angular.isDefined(toState.data.pageSubtitle)) {
          $rootScope.pageTitle = toState.data.pageSubtitle + ' :: ' + toState.data.pageTitle + ' | BeamPay' ;
        } else {
          $rootScope.pageTitle = toState.data.pageTitle + ' | BeamPay' ;
        }
      }

      //Transition to login on protected pages without authentication
      var nonProtectedStates = [
        'signin', 'signup', 'activate', 'confirmEmail', 'forgot',
        'signupComplete', 'landing', 'hiw', 'about'];

      var isProtectedState = true;
      for (var i = 0; i < nonProtectedStates.length; i++) {
        if (toState.name === nonProtectedStates[i]) {
          isProtectedState = false;
        }
      }

      if (isProtectedState && !Auth.isLoggedIn()) {
        $state.transitionTo('signin', {next: $state.current.name});
      }

      // Scroll to top on all new pages
      $anchorScroll();
    });

    // Initialise Wow.js
    new WOW().init();
  });
