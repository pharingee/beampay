'use strict';

angular.module('app.transaction')
  .service('Transaction', function ($http, $q, API_SERVER, Persist){

    var serverCall = function(endPoint, parameters){
      var url = API_SERVER + endPoint;
      var deferred = $q.defer();

      $http.put(url, parameters).
        success(function(response){
          deferred.resolve(response);
        }).
        error(function (data){
          deferred.reject(data);
        });

      return deferred.promise;
    };

    var getPricing = function () {
      var url = API_SERVER + '/pricing/';
      var deferred = $q.defer();

      $http.get(url).
        success(function(response){
          Persist.savePricing(response.data);
          deferred.resolve(response);
        }).
        error(function (data){
          deferred.reject(data);
        });

      return deferred.promise;
    };

    var addAirtime = function (parameters) {
      var pricing = Persist.getPricing();
      parameters.exchangeRateId = pricing.exchangeRateId;
      parameters.serviceFeeId = pricing.serviceFeeId;

      return serverCall('/add/airtime/', parameters);
    };

    var addBill = function (parameters) {
      var pricing = Persist.getPricing();
      parameters.exchangeRateId = pricing.exchangeRateId;
      parameters.serviceFeeId = pricing.serviceFeeId;

      return serverCall('/add/bill/', parameters);
    };

    var addValet = function (parameters) {
      return serverCall('/add/valet/', parameters);
    };

    var addGift = function (parameters) {
      return serverCall('/add/gift/', parameters);
    };

    var addSchool = function (parameters) {
      return serverCall('/add/school/', parameters);
    };

    return {
      addAirtime: function (parameters) {
        return addAirtime(parameters);
      },
      addBill: function (parameters) {
        return addBill(parameters);
      },
      addValet: function (parameters) {
        return addValet(parameters);
      },
      addGift: function (parameters) {
        return addGift(parameters);
      },
      addSchool: function (parameters) {
        return addSchool(parameters);
      },
      getPricing: function () {
        return getPricing();
      }
    };

  });
