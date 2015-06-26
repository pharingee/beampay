'use strict';

angular
  .module('app.airtime', [])
  .config(function ($stateProvider, $urlRouterProvider) {
  	var tempPrefix = 'apps/airtime/views/';

  	$stateProvider
    // route to show basic form
  	  .state('airtime', {
  	  	url: '/airtime',
  	  	templateUrl: tempPrefix + 'airtime.html',
        controller: 'airtimeCtrl',
  	  	data: {
  	  	  pageTitle: 'Welcome | Airtime Top ups'
  	  	}
  	  })

      //nested states
      // each section would have their own view
      //url will be nested (airtime/choose)
      .state('airtime.choose', {
        url: '/choose',
        templateUrl: tempPrefix + 'airtimeChooseServices.html'
      })

      // url will be /airtime/recipient
      .state('airtime.recipient', {
        url: '/recipient',
        templateUrl: tempPrefix + 'airtimeRecipientDetails.html'
      })

      //url will be airtime/payment
      .state('airtime.payment', {
        url: '/payment',
        templateUrl: tempPrefix + 'airtimePayment.html'
      });

      // catch all route
      // send users to the form page
      $urlRouterProvider.otherwise('/airtime/choose');
  });