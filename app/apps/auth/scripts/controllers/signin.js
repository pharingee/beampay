'use strict';

angular
  .module('app.auth')
  .controller('SignInCtrl', function ($scope, $state, $stateParams, $window, $auth, $location, Auth, Error) {

    $scope.signIn = {};
    $scope.signIn.submit = function () {
      // Reset
      $scope.signIn.errors = [];
      var email = $scope.signIn.email;
      var pass = $scope.signIn.pass;

      // Client checks
      if (!$scope.signIn.email || !$scope.signIn.pass) {
        $scope.signIn.errors.push('All fields required');
        return;
      }

      // Server Request
      Auth.signIn(email, pass)
        .then(function (isComplete) {
          if (isComplete){
            var next = $stateParams.next;

            if (next) {
              $state.transitionTo(next);
            } else {
              $state.transitionTo('app');
            }
          } else {
            $state.transitionTo('onboard.name');
          }
        }, function (data) {
          $scope.signIn.errors = Error.signIn(data);
        });
    };


    $scope.signIn.fb = function() {
      $auth.authenticate('facebook', {
        'acceptedPrivacyPolicy': true
      }).then(function (req) {
        Auth.persist(req.data.id, req.data.token, req.data.complete);
        Auth.saveName(req.data.firstName, req.data.lastName);

        if (!req.data.complete) {
          $location.path($state.href('onboard.name').slice(2));
        } else {
          if ($stateParams.next) {
            $location.path($state.href($stateParams.next).slice(2));
          } else {
            $location.path($state.href('app').slice(2));
          }
        }

      }, function (req) {
        $scope.signIn.errors = Error.signInFb(req.data);
      });
    };

    $scope.forgot = function () {
      $state.transitionTo('forgot');
    };

    $('.show-email').click(function () {
      $('#sign-form').slideToggle();
    });

  });
