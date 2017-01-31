(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomListController', RoomListController);

  /** @ngInject */
  function RoomListController($window, $rootScope, firebaseService, $firebaseArray, authenticationService) {
    var vm = this;

    vm.rooms = [];
    vm.createdRooms = [];
    vm.enrolledRooms = [];

    var userID = authenticationService.getCurrentUser().uid;

    // TODO User auth required alonside their uid
    function getRooms() {
      getCreatedRooms();
      getEnrolledRooms();
      console.log(authenticationService.getCurrentUser());
      vm.rooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + authenticationService.getCurrentUser().uid));
      console.log(vm.rooms);
    }


    function getCreatedRooms() {
        vm.createdRooms = $firebaseArray(firebaseService.getUserCreatedRoomRef().child('/' + userID));
    }

    function getEnrolledRooms() {
        vm.enrolledRooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + userID));
    }

    getRooms();

  }
})();
