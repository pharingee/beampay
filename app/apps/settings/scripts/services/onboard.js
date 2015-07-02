'use strict';

angular.module('app.settings')
  .service('Onboard', function ($http, $q, API_SERVER, Persist){

    var saveName = function(firstName, lastName){
      var url = API_SERVER + 'account/profile/';
      var deferred = $q.defer();

      $http.put(url, {firstName:firstName, lastName: lastName}).
      success(function(){
        Persist.saveUserName(firstName, lastName);
        deferred.resolve();
      }).
      error(function (data){
        deferred.reject(data);
      });
      return deferred.promise;
    };

    var saveAddress = function(address){
      var url = API_SERVER + 'account/profile/';
      var deferred = $q.defer();

      $http.put(url, {profile: address}).
      success(function(){
        deferred.resolve();
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
      saveName: function (firstName, lastName){
        return saveName(firstName, lastName);
      },
      saveAddress: function(address){
        return saveAddress(address);
      },
      setReferral: function (referralCode) {
        return setReferral(referralCode);
      }
    };

  });
