'use strict';

angular
  .module('app.transaction')
  .controller('TransactionDetailCtrl', function ($scope, $stateParams, Transaction, TransactionUtil, Persist) {
    $scope.toCurr = function (amount) {
      return TransactionUtil.toCurr(parseFloat(amount));
    };

    $scope.currentUser = Persist.getUser();

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
      } else if (comment === 'INFO') {
        return 'We\'re gathering information about your transaction.';
      } else if (comment === 'REDY') {
        return 'We\'re ready to receive payment on your transaction.';
      } else if (comment === 'PAID') {
        return 'We\'ve successfully confirmed payment for your transaction.';
      } else if (comment === 'PROC') {
        return 'We\'ve successfully processed and completed the transaction you requested. Thank you for using BeamPay.';
      } else if (comment === 'CANC') {
        return 'Sorry, we could not complete this transaction.';
      }else if (comment === 'INVD') {
        return 'Sorry, we could not proceed with this transaction. Please contact us for further details. Thank you.';
      } else {
        return comment;
      }
    };

    $scope.status = {
      details: true,
      recipient: true,
      pricing: true
    };

  })


  .controller('TransactionCtrl', function ($scope, TransactionUtil, Transaction) {

    $scope.transactions = [];

    $scope.getDescription = function (transaction) {
      return TransactionUtil.getDescription(transaction);
    };

    $scope.getType = function (transaction) {
      return TransactionUtil.getType(transaction);
    };

    Transaction.getTransactions().then(
      function (response) {
        $scope.transactions = response;
        $scope.$broadcast('dataloaded');
      },
      function () {});
  });
