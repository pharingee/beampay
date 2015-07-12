'use strict';

angular.module('app.general')
  .service('Modal', function ($http, $q, API_SERVER) {

    var sendEmail = function (fromName, fromEmail, toName, toEmail) {
      var url = API_SERVER + 'share_mail/';
      var deferred = $q.defer();

      $http.post(url, {
        'fromName': fromName,
        'fromEmail': fromEmail,
        'toName': toName,
        'toEmail': toEmail
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