'use strict';

angular.module('app.settings')
  .service('Referral', function ($http, $q, API_SERVER, Persist){

    var getReferral = function () {
      var url = API_SERVER + 'referral/';
      var deferred = $q.defer();

      $http.get(url).
      success(function(response){
        Persist.setReferralCode(response.code);
        deferred.resolve(response);
      }).
      error(function (data){
        deferred.reject(data);
      });
      return deferred.promise;
    };

    var setReferral = function (referralCode) {
      var url = API_SERVER + 'referral/add/';
      var deferred = $q.defer();

      $http.post(url, {code: referralCode}).
      success(function(){
        deferred.resolve();
      }).
      error(function (data){
        deferred.reject(data);
      });
      return deferred.promise;
    };

    return {
      setReferral: function (referralCode) {
        return setReferral(referralCode);
      },
      getReferral: function () {
        return getReferral();
      }
    };

  });
