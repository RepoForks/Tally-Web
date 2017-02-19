(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomListController', RoomListController);

  /** @ngInject */
  function RoomListController($state, $window, $rootScope, firebaseService, $firebaseArray, authenticationService, $uibModal) {
    var vm = this;

    vm.rooms = [];
    vm.createdRooms = [];
    vm.enrolledRooms = [];

    var userID = authenticationService.getCurrentUser().uid;

    // TODO User auth required alonside their uid
    function getRooms() {
      getCreatedRooms();
      getEnrolledRooms();
      // vm.rooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + authenticationService.getCurrentUser().uid));
    }

    function getCreatedRooms() {
      vm.createdRooms = $firebaseArray(firebaseService.getUserCreatedRoomRef().child('/' + userID));
    }

    function getEnrolledRooms() {
      vm.enrolledRooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + userID));
    }

    vm.navigateToRoom = function(id) {
      $state.go('room.detail', { roomID: id});
    }

    vm.navigateToCreation = function() {
      $state.go('room.create');
    }

    vm.showEnrolledDialog = function() {
      console.log($uibModal);
      var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'app/room/list/enrollDialog.html',
         controller: RoomListController,
         controllerAs: 'vm',
         size: 'lg'
      });
    }

    vm.enroll = function(moduleCode) {
      // check if module code exists within room entries
      firebaseService.getRoomRef().once('value', snapshot => {
        snapshot.forEach(entry => {
          if(entry.hasChild('code')) {
            if(entry.val().code === moduleCode) {
              var ref = firebaseService.getUserRoomRef().child(authenticationService.getCurrentUser().uid).child('/' + entry.key)
              ref.update(entry.val());
              ref.update({id: entry.key});
              return true;
            }
          }
        });
      });
    }

    vm.navigateToUpdate = function(room) {
      $state.go('room.update', {roomID: room.id, room: room});
    }

    getRooms();

  }
})();
