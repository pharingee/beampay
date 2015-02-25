'use strict';

angular.module('valueApp')
  .controller('EmailModalCtrl', function ($scope, $modal) {
    $scope.open = function () {
      $modal.open({
        templateUrl: 'views/landing/modals/_email.html',
        controller: 'EmailSendCtrl'
      });
    };
  });

angular.module('valueApp')
  .controller('EmailSendCtrl', function ($scope, $modalInstance, $http) {
    $scope.ok = function () {
      $http.post('/email', {
        'fromname': $scope.fromName,
        'replyto': $scope.fromEmail,
        'toname': $scope.toName,
        'to': $scope.toEmail
      }).success(function () {
        $modalInstance.close();
      });
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
