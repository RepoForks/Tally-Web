(function() {
  'use strict';

  angular
    .module('tally')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, authenticationService) {

    $log.debug(authenticationService.getAuth());

    authenticationService.getAuth().$onAuthStateChanged(function(authData) {
      $log.debug(authData);
      authenticationService.setCurrentUser(authData);
    });

    $log.debug('runBlock end');
  }

})();
