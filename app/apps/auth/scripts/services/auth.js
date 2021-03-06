'use strict';

angular
  .module('app.auth')
  .service('Auth', function ($cookieStore, $http, $q, Persist, API_SERVER) {
    API_SERVER += 'account/';

    var persist = function (id, token, complete) {
      Persist.saveUser(id, token, complete);
    };

    var saveName = function (firstName, lastName) {
      Persist.saveUserName(firstName, lastName);
    };

    var signup = function (user) {
      var url = API_SERVER + 'signup/';
      var deferred = $q.defer();
      Persist.deleteUser();

      $http.post(url, {
        'email': user.email,
        'password1': user.pass1,
        'password2': user.pass2,
        'acceptedPrivacyPolicy': user.privacy,
        'referralCode': user.referralCode
      }).success(function () {
        Persist.saveEmail(user.email);
        deferred.resolve();
      }).error(function (data, status) {
        deferred.reject({data: data, status: status});
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
        persist(data.id, data.token, data.complete);
        if (data.complete) {
          saveName(data.firstName, data.lastName);
        }
        deferred.resolve(data.complete);
      }).error(function (data, status) {
        deferred.reject({data: data, status: status});
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
        persist(data.id, data.token, false);
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

    var isLoggedIn = function () {
      if (Persist.getUser().userid) {
        return true;
      }
      return false;
    };

    return {
      persist: function (id, token, complete) {
        return persist(id, token, complete);
      },
      saveName: function (firstName, lastName) {
        return saveName(firstName, lastName);
      },
      signup: function (user) {
        return signup(user);
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
      },
      isLoggedIn: function () {
        return isLoggedIn();
      }
    };
  });
