'use strict';

angular
  .module('app.auth')
  .service('Auth', function ($http, $q, Persist, API_SERVER) {
    API_SERVER += 'account/';

    var signup = function (email, pass1, pass2, privacy) {
      var url = API_SERVER + 'signup/';
      var deferred = $q.defer();
      Persist.deleteUser();

      $http.post(url, {
        'email': email,
        'password1': pass1,
        'password2': pass2,
        'acceptedPrivacyPolicy': privacy,
      }).success(function () {
        Persist.saveEmail(email);
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var signIn = function (email, pass) {
      var url = API_SERVER + 'signin/';
      var deferred = $q.defer();
      Persist.deleteUser();

      $http.post(url, {
        'email': email,
        'password': pass
      }).success(function (data) {
        Persist.saveUser(data.id, data.token);
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var signout = function () {
      var url = API_SERVER + 'signout/';
      var deferred = $q.defer();

      $http.post(url).success(function () {
        Persist.deleteUser();
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var activate = function (key) {
      var url = API_SERVER + 'activate/' + key + '/';
      var deferred = $q.defer();

      $http.get(url).success(function (data) {
        Persist.saveUser(data.id, data.token);
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var activateResend = function () {
      var url = API_SERVER + 'activate/resend/';
      var deferred = $q.defer();

      $http.post(url, {
        email: Persist.getEmail()
      }).success(function () {
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    return {
      signup: function (email, pass1, pass2, privacy) {
        return signup(email, pass1, pass2, privacy);
      },
      signIn: function (email, pass) {
        return signIn(email, pass);
      },
      signout: function () {
        return signout();
      },
      activate: function (key) {
        return activate(key);
      },
      activateResend: function (email) {
        return activateResend(email);
      }
    };
  });