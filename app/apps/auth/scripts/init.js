'use strict';

angular
  .module('app.auth', ['satellizer'])
  .config(function ($routeProvider, $httpProvider, $authProvider, API_SERVER, FACEBOOK_CLIENT_ID) {
    var urlPrefix = '/auth/';
    var tempPrefix = 'apps/auth/views/';

    $routeProvider
      .when(urlPrefix + 'signup', {
        templateUrl: tempPrefix + 'signup.html'
      })
      .when(urlPrefix + 'signup/complete', {
        templateUrl: tempPrefix + 'signupComplete.html'
      })
      .when(urlPrefix + 'signin', {
        templateUrl: tempPrefix + 'signin.html'
      })
      .when(urlPrefix + 'activate/:key', {
        templateUrl: tempPrefix + 'activate.html'
      })
      .when(urlPrefix + 'settings', {
        templateUrl: tempPrefix + 'settings.html'
      })
      .when(urlPrefix + 'settings/email', {
        templateUrl: tempPrefix + 'changeEmail.html'
      })
      .when(urlPrefix + 'settings/email/:key', {
        templateUrl: tempPrefix + 'confirmEmail.html'
      })
      .when(urlPrefix + 'settings/password', {
        templateUrl: tempPrefix + 'password.html'
      })
      .when(urlPrefix + 'forgot', {
        templateUrl: tempPrefix + 'forgot.html'
      })
      .when(urlPrefix + 'forgot/:key', {
        templateUrl: tempPrefix + 'resetPassword.html'
      });

    $httpProvider.interceptors.push('AuthInterceptor');

    $authProvider.baseUrl = API_SERVER;
    $authProvider.facebook({
      clientId: FACEBOOK_CLIENT_ID,
      url: 'account/signin/facebook/'
    });
  });
