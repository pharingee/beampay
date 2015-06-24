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

    var saveAddress = function(dateOfBirth, country, phoneNumber, address){
      var url = API_SERVER + 'account/profile/';
      var deferred = $q.defer();

      $http.put(url, {
        profile: {
          dateOfBirth: dateOfBirth,
          country: country,
          phoneNumber: phoneNumber,
          address: address}
        }).
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
      saveAddress: function(dateOfBirth, country, phoneNumber, address){
        return saveAddress(dateOfBirth, country, phoneNumber, address);
      }
    };

  });
