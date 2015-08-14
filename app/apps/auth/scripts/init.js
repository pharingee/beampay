'use strict';

angular
  .module('app.auth', ['satellizer'])
  .config(function ($stateProvider, $httpProvider, $authProvider, API_SERVER, FACEBOOK_CLIENT_ID) {
    var urlPrefix = '/auth/';
    var tempPrefix = 'apps/auth/views/';

    $stateProvider
      .state('signupComplete', {
        url: urlPrefix + 'signup/complete',
        templateUrl: tempPrefix + 'signupComplete.html',
        data: {
          pageTitle: 'Signup Complete'
        }
      })
      .state('signup', {
        url: urlPrefix + 'signup/?next&referralCode',
        templateUrl: tempPrefix + 'signup.html',
        data: {
          pageTitle: 'Signup'
        }
      })
      .state('signin', {
        url: urlPrefix + 'signin/?next',
        templateUrl: tempPrefix + 'signin.html',
        data: {
          pageTitle: 'Signin'
        }
      })
      .state('facebookredirect', {
        url: urlPrefix + 'facebook-redirect',
        templateUrl: tempPrefix + 'facebookRedirect.html',
        data: {
          pageTitle: 'Loggin In'
        }
      })
      .state('activate', {
        url: urlPrefix + 'activate/:key/',
        templateUrl: tempPrefix + 'activate.html',
        data: {
          pageTitle: 'Activate'
        }
      })
      .state('settings', {
        url: urlPrefix + 'settings',
        templateUrl: tempPrefix + 'settings.html',
        data: {
          pageTitle: 'Settings'
        }
      })
      .state('settings.email', {
        url: urlPrefix + 'settings/email',
        templateUrl: tempPrefix + 'changeEmail.html',
        data: {
          pageTitle: 'Email Settings'
        }
      })
      .state('settings.password', {
        url: urlPrefix + 'settings/password',
        templateUrl: tempPrefix + 'password.html',
        data: {
          pageTitle: 'Password Settings'
        }
      })
      .state('forgot', {
        url: urlPrefix + 'forgot',
        templateUrl: tempPrefix + 'forgot.html',
        data: {
          pageTitle: 'Forgot Password'
        }
      })
      .state('resetPassword', {
        url: urlPrefix + 'forgot/:key/',
        templateUrl: tempPrefix + 'resetPassword.html',
        data: {
          pageTitle: 'Reset Password'
        }
      });

    $httpProvider.interceptors.push('AuthInterceptor');

    $authProvider.baseUrl = API_SERVER;
    $authProvider.loginRedirect = '/auth/facebook-redirect';
    $authProvider.facebook({
      clientId: FACEBOOK_CLIENT_ID,
      url: 'account/signin/facebook/'
    });
  });
