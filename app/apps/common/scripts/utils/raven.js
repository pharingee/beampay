'use strict';

angular
  .module('app.utils')
  .config(function ($provide, $window) {
    $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
      return function (exception, clause) {
        $delegate(exception, clause);
        if ($window.Raven) {
          Raven.captureException(exception.clause);
        }
      };
    }]);
  });
