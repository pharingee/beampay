'use strict';

angular
  .module('app.transaction')
  .controller('HomeCtrl', function ($scope, Persist) {
    $scope.currentUser = Persist.getUser();
    console.log(Persist.getUser());
  });
