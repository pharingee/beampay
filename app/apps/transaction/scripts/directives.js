'use strict';

angular
  .module('app.transaction')
  .directive('fadeTransactions', function ($timeout) {
    return {
      restrict: 'AE',
      link: function ($scope, element, attrs) {
        $timeout(function () { // You might need this timeout to be sure its run after DOM render.
          // $('.transaction-list .transaction-item').hover(function () {
          //   console.log($('.transaction-list .transaction-item a').not($(this)))//.css('color', 'blue');
          // });
        }, 0, false);
      }
    };
  });
