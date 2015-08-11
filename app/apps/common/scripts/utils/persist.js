'use strict';

angular
  .module('app.utils', [])
  .service('Persist', function ($window, $cookieStore) {
    var USERID_KEY = 'userid';
    var TOKEN_KEY = 'token';
    var EMAIL_KEY = 'email';
    var FIRST_NAME_KEY = 'firstName';
    var LAST_NAME_KEY = 'lastName';
    var COMPLETE_KEY = 'complete';
    // var AVATAR_URL_KEY = 'avatar_url';

    var PRICING_KEY = 'pricing';

    // USER
    var saveUser = function (userId, token, complete) {
      $cookieStore.put(USERID_KEY, userId);
      $cookieStore.put(TOKEN_KEY, token);
      $cookieStore.put(COMPLETE_KEY, complete);
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
      $cookieStore.remove(COMPLETE_KEY);
    };

    var getUser = function () {
      var initials = 'B.P.';
      if ($cookieStore.get(FIRST_NAME_KEY) && $cookieStore.get(LAST_NAME_KEY)){
        initials = $cookieStore.get(FIRST_NAME_KEY).substring(0, 1) + '.' + $cookieStore.get(LAST_NAME_KEY).substring(0, 1) + '.';
      }
      return {
        userid: $cookieStore.get(USERID_KEY),
        token: $cookieStore.get(TOKEN_KEY),
        firstName: $cookieStore.get(FIRST_NAME_KEY),
        lastName: $cookieStore.get(LAST_NAME_KEY),
        complete: $cookieStore.get(COMPLETE_KEY),
        initials: initials
      };
    };

    var completeUser = function () {
      $cookieStore.put(COMPLETE_KEY, true);
      return true;
    };

    // EMAIL
    var saveEmail = function (email) {
      $cookieStore.put(EMAIL_KEY, email);
      return true;
    };

    var getEmail = function () {
      return $cookieStore.get(EMAIL_KEY);
    };

    //Pricing
    var savePricing = function (pricing) {
      $cookieStore.put(PRICING_KEY, JSON.stringify(pricing));
    };

    var getPricing = function () {
      return JSON.parse($cookieStore.get(PRICING_KEY));
    };

    return {
      saveUser: function (userId, token, complete) {
        return saveUser(userId, token, complete);
      },
      saveUserName: function (firstName, lastName) {
        return saveUserName(firstName, lastName);
      },
      getUser: function () {
        return getUser();
      },
      deleteUser: function () {
        return deleteUser();
      },
      completeUser: function () {
        return completeUser();
      },

      saveEmail: function (email) {
        return saveEmail(email);
      },
      getEmail: function () {
        return getEmail();
      },

      savePricing: function (pricing) {
        return savePricing(pricing);
      },
      getPricing: function () {
        return getPricing();
      }
    };
  });
