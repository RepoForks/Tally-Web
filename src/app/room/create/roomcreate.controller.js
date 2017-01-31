(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomCreateController', RoomCreateController);

  /** @ngInject */
  function RoomCreateController(firebaseService, $firebaseArray, authenticationService) {
    var vm = this;

    console.log("CONTROLLER CALLED");

    vm.roomName = '';
    vm.roomCode = '';
    vm.userList = null;

    vm.createdRoom = null;
    vm.roomKey = null;

    vm.onCreateButtonClicked = function() {
      createRoom();
    }

    function createRoom() {

      var userID = authenticationService.getCurrentUser().uid;

      if(validate()) {
        var strippedList = '';
        if(vm.userList) {
          strippedList = vm.userList.split(/[\s,;]+/);
        }

        vm.createdRoom = {
          name: vm.roomName,
          code: vm.roomCode,
          creator: userID,
          userList: strippedList
        };

        console.log(vm.createdRoom);

        // pushes new entry to 'rooms' and returns the generated key
        vm.roomKey = firebaseService.getRoomRef().push(vm.createdRoom).key;
        firebaseService.getUserCreatedRoomRef().child('/' + userID).child('/' + vm.roomKey).set(vm.createdRoom);

        enrollUsersInRoom();
      }

    }

    function enrollUsersInRoom() {
      validateUserList(vm.createdRoom.userList).then(function(validUsers) {
        enrollUsers(validUsers);
      });
    }

    function validateUserList() {
      var validUsers = [];
      return firebaseService.getUserRef().once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var email = childSnapshot.child('/email').val();
          if(vm.createdRoom.userList.indexOf(email) > -1) {
            validUsers.push(childSnapshot.key);
          }
        });
        console.log("Return valid users");
        return validUsers;
      });
    }

    function enrollUsers(validUsers) {
      for(var i=0; i<validUsers.length; i++) {
        enrollUser(validUsers[i]);
      }
    }

    function enrollUser(user) {
      var newRoom = vm.createdRoom;
      newRoom.userList = null;
      firebaseService.getUserRoomRef().child('/' + user).child('/' + vm.roomKey).set(newRoom);
    }

    function validate() {
      if(vm.roomName == '' || vm.roomCode == '') {
        console.log('Validation Error');
        return false;
      }
      console.log("Validate Success");
      return true;
    }
  }
})();
