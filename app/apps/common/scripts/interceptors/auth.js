'use strict';

angular
  .module('app.interceptors', [])
  .service('AuthInterceptor', function ($q, $location, Persist, API_SERVER) {

    var request = function (config) {
      var re = new RegExp('^' + API_SERVER);
      if (config.url.match(re)) {
        config.headers = config.headers || {};
        var currentUser = Persist.getUser();
        if (currentUser && currentUser.token) {
          config.headers.Authorization = 'Token ' + currentUser.token;
        }
      }
      return config;
    };

    var responseError = function (response) {
      if (response.status === 401) {
        Persist.deleteUser();
        $location.path($location.path());
      } else {
        if (Raven) {
          var ravenResponse = {};
          $.extend(ravenResponse, response)
          delete ravenResponse.headers.Authorization;
          delete ravenResponse.config.headers.Authorization;
          delete ravenResponse.config.data.password;
          delete ravenResponse.config.data.password1;
          delete ravenResponse.config.data.password2;
          delete ravenResponse.data.token;
          console.log(ravenResponse);
          Raven.captureException(JSON.stringify(ravenResponse));
        }
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
