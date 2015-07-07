'use strict';

angular
  .module('app.transaction')
  .controller('TransactionDetailCtrl', function ($scope, $stateParams, Transaction, TransactionUtil) {
    console.log($stateParams);

    if ($stateParams.transactionId && $stateParams.transactionType) {
      Transaction.getTransaction($stateParams.transactionId, $stateParams.transactionType).then(
        function (response) {
          $scope.transaction = response;
          $scope.transactionType = $stateParams.transactionType;
        }, function () {});
    }

    $scope.getDescription = function (transaction) {
      return TransactionUtil.getDescription(transaction);
    };

    $scope.getComment = function (comment) {
      if (comment === 'INIT') {
        return TransactionUtil.getDescription({transactionType: $scope.transactionType, data:$scope.transaction});
      } else {
        return comment
      }
    }
  })


  .controller('TransactionCtrl', function ($scope, TransactionUtil, Transaction) {

    $scope.transactions = [];

    $scope.getDescription = function (transaction) {
      return TransactionUtil.getDescription(transaction);
    };

    Transaction.getTransactions().then(
      function (response) {
        $scope.transactions = response;
      },
      function () {});
  });
