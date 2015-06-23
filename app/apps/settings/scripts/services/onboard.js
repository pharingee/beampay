'use strict';

angular.module('app.settings')
  .service('Onboard', function ($http, $q, API_SERVER){

    var saveName = function(firstName, lastName){
      var url = API_SERVER + 'profile/';
      var deferred = $q.defer();

      $http.post(url, {firstName:firstName, lastName: lastName}).
      success(function(){
        deferred.resolve();
      }).
      error(function (data){
        deferred.reject(data);
      });
      return deferred.promise;
    }

    var saveAddress = function(dateOfBirth, country, phoneNumber, address){
      var url = API_SERVER + 'profile/';
      var deferred = $q.defer();

      $http.post(url, {dateOfBirth: dateOfBirth, country: country, phoneNumber: phoneNumber, address: address}).
      success(function(){
        deferred.resolve();
      }).
      error(function (data){
        deferred.reject(data);
      });
      return deferred.promise;
    }
  });
