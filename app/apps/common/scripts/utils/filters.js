'use strict';

angular
  .module('app.utils').
  filter('truncate', function () {
    return function (value, unWordWise, max, tail) {
      if (!value) {
        return '';
      }

      max = parseInt(max, 10);
      if (!max) {
        max = 70;
      }

      if (value.length <= max) {
        return value;
      }

      value = value.substr(0, max);
      if (!unWordWise) {
        var lastspace = value.lastIndexOf(' ');
        if (lastspace !== -1) {
          value = value.substr(0, lastspace);
        }
      }

      return value + (tail || ' …');
    };
  });
