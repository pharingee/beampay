'use strict';

angular
  .module('app.auth')
  .service('AuthInterceptor', function ($q, $location, Persist, API_SERVER) {

    var request = function (config) {
      var re = new RegExp('^' + API_SERVER);
      if (config.url.match(re)) {
        config.headers = config.headers || {};
        var token = Persist.getUser().token;
        if (token) {
          config.headers.Authorization = 'Token ' + token;
        }
      }
      return config;
    };

    var responseError = function (response) {
      if (response.status === 401) {
        Persist.deleteUser();
        $location.path('/auth/signin').search('next', encodeURIComponent($location.path()));
      }
      return $q.reject(response);
    };

    return {
      request: function (config) {
        return request(config);
      },

      responseError: function (response) {
        return responseError(response);
      }
  };
});
