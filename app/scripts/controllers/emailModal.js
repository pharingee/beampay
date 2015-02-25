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
      if ($scope.fromName && $scope.fromEmail && $scope.toName && $scope.toEmail) {
        $scope.loading = true;
        $http.post('/email', {
          'fromname': $scope.fromName,
          'replyto': $scope.fromEmail,
          'toname': $scope.toName,
          'to': $scope.toEmail
        }).success(function () {
          $scope.loading = false;
          $modalInstance.close();
        }).error(function (data) {
          $scope.loading = false;
          $scope.err = data;
        });
      }
    };

    $scope.cancel = function () {
      $modalInstance.dismiss();
    };
  });
