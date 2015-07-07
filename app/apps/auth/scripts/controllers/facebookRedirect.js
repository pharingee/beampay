'use strict';

angular
  .module('app.auth')
  .controller('FacebookCtrl', function ($state, Persist) {
    if (Persist.getUser().complete) {
      $state.transitionTo('app');
    } else {
      $state.transitionTo('onboard.name');
    }
  });
