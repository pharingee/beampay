'use strict';

angular
  .module('app.utils')
  .config(function ($provide) {
    $provide.decorator('$exceptionHandler', ['$delegate', function ($delegate) {
      return function (exception, clause) {
        $delegate(exception, clause);
        if (Raven) {
          Raven.captureException(exception);
        }
      };
    }]);
  });
