'use strict';

angular
  .module('app.utility')
  .controller('UtilityChooseCtrl', function ($scope, $state, $cookieStore, $filter, Onboard, Persist) {

  $scope.utility = {};
  $scope.serviceCharge = 5;
  $scope.finalAmount;


  $scope.utility.submit = function(){
    $scope.utility.errors = [];
    var accountNumber = $scope.utility.accountNumber;
    var creditAmount = $scope.utility.creditAmount;

    
    var choice = {
      accountNumber: accountNumber, 
      creditAmount: creditAmount
    };

    $cookieStore.put('choice', choice);

    console.log(accountNumber, creditAmount);

    if(!accountNumber || !creditAmount){
      $scope.utility.errors.push('We need you to fill all fields');
      return; 
    };
    $state.transitionTo('utility.rec'); 

  };

});