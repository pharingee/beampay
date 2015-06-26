'use strict';

angular
  .module('app.utility')
  .controller('UtilityPayCtrl', function ($scope, $state, $cookieStore, Onboard, Persist) { 
    $scope.utility = {};
    var choice = $cookieStore.get('choice');
    var detail = $cookieStore.get('detail');    

    $scope.creditAmount = choice.creditAmount;
    $scope.accountNumber = choice.accountNumber;
    $scope.utility = 'ECG';
    $scope.serviceFee = 5;
    var firstName = detail.firstName;
    var lastName = detail.lastName;
    $scope.fullName = firstName+" "+lastName;
    $scope.phoneNumber = detail.phoneNumber;
    $scope.emailAddress = detail.emailAddres;
    $scope.finalBill = 200;


    // $scope.creditAmount = $cookieStore

    // $scope.utility.submit = function(){
    //   console.log(choice);
    //   console.log(detail);
    // };
  });