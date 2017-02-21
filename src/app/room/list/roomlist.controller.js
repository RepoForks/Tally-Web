(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomListController', RoomListController);

  /** @ngInject */
  function RoomListController($state, $stateParams, $window, $rootScope, firebaseService, $firebaseArray, authenticationService, $uibModal) {
    var vm = this;

    vm.userID = $stateParams.userID;

    vm.rooms = [];
    vm.createdRooms = [];
    vm.enrolledRooms = [];

    //var userID = authenticationService.getCurrentUser().uid;

    // TODO User auth required alonside their uid
    function getRooms() {
      getCreatedRooms();
      getEnrolledRooms();
      // vm.rooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + authenticationService.getCurrentUser().uid));
    }

    function getCreatedRooms() {
      vm.createdRooms = $firebaseArray(firebaseService.getUserCreatedRoomRef().child('/' + vm.userID));
    }

    function getEnrolledRooms() {
      vm.enrolledRooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + vm.userID));
    }

    vm.navigateToRoom = function(id, creatorID) {
      $state.go('room.detail', { roomID: id, creator: creatorID });
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
