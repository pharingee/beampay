'use strict';

angular
  .module('app.transaction')
  .controller('TransactionCtrl', function ($scope, $state, Transaction) {
    $scope.transactions = [];

    Transaction.getTransactions().then(
      function (response) {
        $scope.transactions = response.results;
      },
      function () {});
  });
