'use strict';

angular
  .module('app.utility')
  .controller('UtilityRecCtrl', function ($scope, $state, $cookieStore, Onboard, Persist) {

  $scope.utility = {};

  $scope.utility.submit = function(){
    $scope.utility.errors = [];
    var firstName = $scope.utility.firstName;
    var lastName = $scope.utility.lastName;
    var phoneNumber = $scope.utility.phoneNumber;
    var emailAddress = $scope.utility.emailAddress;

    var detail = {
      firstName: firstName, 
      lastName: lastName, 
      phoneNumber: phoneNumber,
      emailAddress: emailAddress
    };

    $cookieStore.put('detail', detail);

    console.log(firstName, lastName, phoneNumber, emailAddress);

    if(!firstName || !lastName || !phoneNumber || !emailAddress){
      $scope.utility.errors.push("We need you to fill all fields");
      return;
    };

    $state.transitionTo('utility.pay'); 
  };

});