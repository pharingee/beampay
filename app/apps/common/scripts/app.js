'use strict';

angular
  .module('app', [
    // Third Party libraries
    'angulartics',
    'angulartics.google.analytics',
    'angulartics.mixpanel',
    'angulartics.scroll',
    'ngCookies',
    'ngResource',
    // 'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ngAnimate',
    'ui.bootstrap',
    'ui.bootstrap.datetimepicker',
    'angular-ladda',
    'angularMoment',
    'angular-loading-bar',
    'angular-intro',

    //Config modules
    'app.config',
    'app.constants',
    'app.interceptors',
    'app.directives',
    'app.utils',

    //App modules
    'app.general',
    'app.auth',
    'app.transaction',
    'app.settings',
    'app.airtime',
    'app.television',
    'app.utility',
    'app.internet',
    'app.school',
    'app.valet',
    'app.gift',
    'app.referrals'
  ])

  .config(function ($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, laddaProvider) {
    $locationProvider.hashPrefix('!');
    $urlMatcherFactoryProvider.strictMode(false);

    $stateProvider
      .state('app', {
        url: '/',
        templateUrl: 'apps/transaction/views/layouts/transaction.html',
        data: {
          pageTitle: 'Welcome'
        }
      });

    $urlRouterProvider.otherwise('/home');

    laddaProvider.setOption({
      style: 'zoom-out'
    });
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
        'signupComplete', 'landing', 'hiw', 'about', 'resetPassword', 'faqs'];

      var isProtectedState = true;
      for (var i = 0; i < nonProtectedStates.length; i++) {
        if (toState.name === nonProtectedStates[i]) {
          isProtectedState = false;
        }
      }

      if (isProtectedState && !Auth.isLoggedIn()) {
        $state.transitionTo('signup', {next: $state.current.name});
      }

      mixpanel.track(toState.name, {
        'page title' : document.title,
        'url' : window.location.pathname
      });

      // Scroll to top on all new pages
      $anchorScroll();
    });

    // Initialise Wow.js
    new WOW().init();
  });
