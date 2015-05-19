'use strict';

angular
  .module('app.auth')
  .service('Persist', function ($cookieStore) {
    var USERID_KEY = 'userid';
    var TOKEN_KEY = 'token';
    var EMAIL_KEY = 'email';

    // USER
    var saveUser = function (userId, token) {
      $cookieStore.remove(EMAIL_KEY);
      $cookieStore.put(USERID_KEY, userId);
      $cookieStore.put(TOKEN_KEY, token);
    };

    var deleteUser = function () {
      $cookieStore.remove(USERID_KEY);
      $cookieStore.remove(TOKEN_KEY);
    };

    var getUser = function () {
      try {
        return {
          userid: $cookieStore.get(USERID_KEY),
          token: $cookieStore.get(TOKEN_KEY)
        };
      } catch (e) {
        $cookieStore.remove(USERID_KEY);
        $cookieStore.remove(TOKEN_KEY);
        return null;
      }
    };

    // EMAIL
    var saveEmail = function (email) {
      $cookieStore.put(EMAIL_KEY, email);
    };

    var getEmail = function () {
      return $cookieStore.get(EMAIL_KEY);
    };

    return {
      saveUser: function (userId, token, email) {
        return saveUser(userId, token, email);
      },
      getUser: function () {
        return getUser();
      },
      deleteUser: function () {
        return deleteUser();
      },

      saveEmail: function (email) {
        return saveEmail(email);
      },
      getEmail: function () {
        return getEmail();
      }
    };
  });
