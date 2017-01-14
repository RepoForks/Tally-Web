(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomListController', RoomListController);

  /** @ngInject */
  function RoomListController($window, $rootScope, firebaseService, $firebaseArray, authenticationService) {
    var vm = this;

    vm.rooms = [];

    // TODO User auth required alonside their uid
    function getRooms() {
      console.log(authenticationService.getCurrentUser());
      vm.rooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + authenticationService.getCurrentUser().uid));
      console.log(vm.rooms);
    }

    getRooms();

  }
})();
