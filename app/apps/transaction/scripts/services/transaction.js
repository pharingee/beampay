'use strict';

angular.module('app.transaction')
  .service('Transaction', function ($http, $q, API_SERVER, Persist){

    var serverCall = function(endPoint, parameters){
      var url = API_SERVER + endPoint;
      var deferred = $q.defer();

      $http.post(url, parameters).
        success(function(response){
          deferred.resolve(response);
        }).
        error(function (data){
          deferred.reject(data);
        });

      return deferred.promise;
    };

    var getPricing = function () {
      var url = API_SERVER + 'pricing/';
      var deferred = $q.defer();

      $http.get(url).
        success(function(response){
          Persist.savePricing(response);
          deferred.resolve(response);
        }).
        error(function (data){
          deferred.reject(data);
        });

      return deferred.promise;
    };

    var serverGet = function (endPoint) {
      var url = API_SERVER + endPoint;
      var deferred = $q.defer();

      $http.get(url).
        success(function(response){
          deferred.resolve(response);
        }).
        error(function (data) {
          deferred.reject(data);
        });

      return deferred.promise;
    };

    var getReferral = function () {
      return serverGet('referral/');
    };

    var getTransactions = function () {
      return serverGet('transaction/');
    };

    var getTransaction = function (transactionId, transactionType) {
      return serverGet('transaction/' + transactionId + '/?type=' + transactionType);
    };

    var getProfile = function () {
      return serverGet('account/profile/');
    }

    var addAirtime = function (parameters) {
      var pricing = Persist.getPricing();
      parameters.exchangeRateId = pricing.exchangeRateId;
      parameters.serviceFeeId = pricing.serviceFeeId;

      return serverCall('transaction/add/airtime/', parameters);
    };

    var addBill = function (parameters) {
      var pricing = Persist.getPricing();
      parameters.exchangeRateId = pricing.exchangeRateId;
      parameters.serviceFeeId = pricing.serviceFeeId;
      return serverCall('transaction/add/bill/', parameters);
    };

    var addValet = function (parameters) {
      return serverCall('transaction/add/valet/', parameters);
    };

    var addGift = function (parameters) {
      return serverCall('transaction/add/gift/', parameters);
    };

    var addSchool = function (parameters) {
      return serverCall('transaction/add/school/', parameters);
    };

    var savePayment = function (parameters) {
      return serverCall('payment/stripe/', parameters);
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
      },
      getReferral: function () {
        return getReferral();
      },
      savePayment: function (parameters) {
        return savePayment(parameters);
      },
      getTransaction: function (transactionId, transactionType) {
        return getTransaction(transactionId, transactionType);
      },
      getTransactions: function () {
        return getTransactions();
      },
      getProfile: function () {
        return getProfile();
      }
    };

  });
