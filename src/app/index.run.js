(function() {
  'use strict';

  angular
    .module('tally')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
