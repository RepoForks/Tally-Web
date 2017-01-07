(function() {
  'use strict';

  angular
  .module('tally')
  .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope, $state, authenticationService) {

    $rootScope.authData = null;

    authenticationService.getAuth().$onAuthStateChanged(function(authData) {
      $rootScope.authData = authData;
      authenticationService.setCurrentUser(authData);
    });

    // $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
    //   if (toState.authenticate && $rootScope.authData == null){
    //     console.log($rootScope.authData);
    //     // User isn’t authenticated
    //     $state.transitionTo('home');
    //     event.preventDefault();
    //   }
    // });

    $log.debug('runBlock end');
  }

})();
