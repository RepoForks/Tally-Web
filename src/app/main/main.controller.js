(function() {
  'use strict';

  angular
    .module('tally')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($state, authenticationService, $timeout, toastr, firebaseService) {
    var vm = this;

    // if(authenticationService.getCurrentUser() != null) {
    //   $state.go('room.list', {userID: authenticationService.getCurrentUser().uid});
    // }

    $state.go('room.list', {userID: authenticationService.getCurrentUser().uid});
  }
})();
