(function() {
  'use strict';

  angular
  .module('tally')
  .run(runBlock);

  /** @ngInject */
  function runBlock($window, $log, $rootScope, $state, authenticationService) {

    authenticationService.getAuth().$onAuthStateChanged(function(authData) {
      var data = JSON.stringify(authData);

      $window.sessionStorage.setItem('currentUser', data);
      $rootScope.authData = authData;
      authenticationService.setCurrentUser(authData);

      if(authData == null) {
        $state.go('login');
      }

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
