'use strict';

angular.module('app.general')
  .service('Modal', function ($http, $q) {

    var sendEmail = function (fromName, fromEmail, toName, toEmail) {
      var deferred = $q.defer();

      $http.post('/email', {
        'fromname': fromName,
        'replyto': fromEmail,
        'toname': toName,
        'to': toEmail
      }).success(function () {
        deferred.resolve();
      }).error(function (data) {
        deferred.reject(data);
      });

      return deferred.promise;
    };

    return {
      sendEmail: function (fromName, fromEmail, toName, toEmail) {
        return sendEmail(fromName, fromEmail, toName, toEmail);
      }
    };

  });
