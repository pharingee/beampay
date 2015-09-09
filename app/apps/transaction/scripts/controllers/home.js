'use strict';

angular
  .module('app.transaction')
  .controller('HomeCtrl', function ($scope, Persist) {
    $scope.currentUser = Persist.getUser();

    $scope.IntroOptions = {
      steps: [{
        element: document.querySelector('#intro-gift'),
        intro: 'Select a Gift to send'
      }],
      showStepNumbers: false,
      showBullets: false,
      exitOnOverlayClick: true,
      exitOnEsc: true,
      nextLabel: 'Next',
      prevLabel: 'Previous',
      doneLabel: 'Thanks'
    };

  });
