'use strict';

angular
  .module('app.airtime')
  .controller('airtimeCtrl', function ($scope) {

    //store all form data in this object
    $scope.airtimeFormData = {};

    // function to process the form
    $scope.processAirtimeForm = function() {
      alert('awesome!');
    };
  });

// $(document).ready(function() {

//   // use jQuery to update progress bar
//   $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    
//     //update progress
//     var step = $(e.target).data('step');
//     var percent = (parseInt(step) / 5) * 100;
    
//     $('.progress-bar').css({width: percent + '%'});
//     $('.progress-bar').text("Step " + step + " of 5");
    
//   });

// });

// .controller('ProgressBarCtrl', function ($scope, $http) {
//     $scope.goNext = function(i){    
//     $('[href=#step'+(i+1)+']').tab('show');
//     return false;
    
//   }
//   })
