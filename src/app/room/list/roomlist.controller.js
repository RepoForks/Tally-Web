(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomListController', RoomListController);

  /** @ngInject */
  function RoomListController(firebaseService, $firebaseArray) {
    var vm = this;

    vm.rooms = [];

    // TODO User auth required alonside their uid
    function getRooms() {
      vm.rooms = $firebaseArray(firebaseService.getUserRoomRef().child('3B1ePSqxO3TwgGb3wtfzBJg7CSs2'));
      console.log(vm.rooms);
    }

    getRooms();

  }
})();
