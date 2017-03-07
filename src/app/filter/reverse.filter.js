(function() {
  'use strict';

  angular
    .module('tally')
    .filter('reverse', function() {
      return function(items) {
        return items.slice().reverse();
      };
    });

})();
