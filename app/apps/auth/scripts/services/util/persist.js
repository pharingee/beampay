'use strict';

angular
  .module('app.auth')
  .service('Persist', function ($window, $cookieStore) {
    var USERID_KEY = 'userid';
    var TOKEN_KEY = 'token';
    var EMAIL_KEY = 'email';
    var FIRST_NAME_KEY = 'firstName';
    var LAST_NAME_KEY = 'lastName';
    // var AVATAR_URL_KEY = 'avatar_url';

    // USER
    var saveUser = function (userId, token) {
      $cookieStore.put(USERID_KEY, userId);
      $cookieStore.put(TOKEN_KEY, token);
    };

    // USER
    var saveUserName = function (firstName, lastName) {
      $cookieStore.put(FIRST_NAME_KEY, firstName);
      $cookieStore.put(LAST_NAME_KEY, lastName);
    };

    var deleteUser = function () {
      $cookieStore.remove(USERID_KEY);
      $cookieStore.remove(TOKEN_KEY);
      $cookieStore.remove(EMAIL_KEY);
      $cookieStore.remove(FIRST_NAME_KEY);
      $cookieStore.remove(LAST_NAME_KEY);
    };

    var getUser = function () {
      return {
        userid: $cookieStore.get(USERID_KEY),
        token: $cookieStore.get(TOKEN_KEY),
        firstName: $cookieStore.get(FIRST_NAME_KEY),
        lastName: $cookieStore.get(LAST_NAME_KEY)
      };
    };

    // EMAIL
    var saveEmail = function (email) {
      $cookieStore.put(EMAIL_KEY, email);
    };

    var getEmail = function () {
      return $cookieStore.get(EMAIL_KEY);
    };

    return {
      saveUser: function (userId, token) {
        return saveUser(userId, token);
      },
      saveUserName: function (firstName, lastName) {
        return saveUser(firstName, lastName);
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
