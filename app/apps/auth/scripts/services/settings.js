'use strict';

angular
  .module('app.auth')
  .service('Settings', function ($http, $q, Persist, API_SERVER) {
    API_SERVER += 'account/';

    var changeEmail = function (newEmail) {
      var url = API_SERVER + 'email/';
      var deferred = $q.defer();

      $http.post(url, {
        'email': newEmail,
      }).success(function () {
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var confirmEmail = function (key) {
      var url = API_SERVER + 'confirm-email/' + key + '/';
      var deferred = $q.defer();

      $http.get(url).success(function () {
        deferred.resolve();
      }).error(function (data) {
        console.log(data);
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var isPassword = function () {
      var url = API_SERVER + 'password/set/';
      var deferred = $q.defer();

      $http.get(url).success(function (data) {
        deferred.resolve(data.passwordSet);
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var changePassword = function (oldPass, pass1, pass2) {
      var url = API_SERVER + 'password/';
      var deferred = $q.defer();

      $http.post(url, {
        oldPassword: oldPass,
        password1: pass1,
        password2: pass2
      }).success(function (data) {
        var userid = Persist.getUser().userid;
        Persist.saveUser(userid, data.token);
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var setPassword = function (pass1, pass2) {
      var url = API_SERVER + 'password/set/';
      var deferred = $q.defer();

      $http.post(url, {
        password1: pass1,
        password2: pass2
      }).success(function () {
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var requestResetPassword = function (email) {
      var url = API_SERVER + 'password/reset/';
      var deferred = $q.defer();

      $http.post(url, {
        email: email
      }).success(function () {
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var showResetPassword = function (key) {
      var url = API_SERVER + 'password/reset/confirm/' + key + '/';
      var deferred = $q.defer();

      $http.get(url).success(function () {
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    var resetPassword = function (key, pass1, pass2) {
      var url = API_SERVER + 'password/reset/confirm/' + key + '/';
      var deferred = $q.defer();

      $http.post(url, {
        password1: pass1,
        password2: pass2
      }).success(function () {
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    return {
      changeEmail: function (newEmail) {
        return changeEmail(newEmail);
      },
      confirmEmail: function (key) {
        return confirmEmail(key);
      },
      changePassword: function (oldPass, pass1, pass2) {
        return changePassword(oldPass, pass1, pass2);
      },
      isPassword: function (key) {
        return isPassword(key);
      },
      setPassword: function (pass1, pass2) {
        return setPassword(pass1, pass2);
      },
      requestResetPassword: function (email) {
        return requestResetPassword(email);
      },
      showResetPassword: function (key) {
        return showResetPassword(key);
      },
      resetPassword: function (key, pass1, pass2) {
        return resetPassword(key, pass1, pass2);
      }
    };
  });
