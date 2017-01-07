(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomCreateController', RoomCreateController);

  /** @ngInject */
  function RoomCreateController(firebaseService, $firebaseArray) {
    var vm = this;

    console.log("CONTROLLER CALLED");

    vm.roomName = '';
    vm.roomCode = '';
    vm.userList = null;

    vm.test = "FUCK ME";

    vm.createdRoom = null;
    vm.roomKey = null;

    vm.onCreateButtonClicked = function() {
      console.log("Clicked Create");
      createRoom();
    }

    function createRoom() {

      if(validate()) {
        var strippedList = '';
        if(vm.userList) {
          console.log("Stripp");
          strippedList = vm.userList.split(/[\s,;]+/);
        }

        console.log("LIST = " + strippedList);

        vm.createdRoom = {
          name: vm.roomName,
          code: vm.roomCode,
          userList: strippedList
        };

        console.log(vm.createdRoom);

        // pushes new entry to 'rooms' and returns the generated key
        vm.roomKey = firebaseService.getRoomRef().push(vm.createdRoom).key;

        enrollUsersInRoom();
      }

    }

    function enrollUsersInRoom() {
      validateUserList(vm.createdRoom.userList).then(function(validUsers) {
        console.log(validUsers);
        enrollUsers(validUsers);
      });
    }

    function validateUserList() {
      var validUsers = [];
      return firebaseService.getUserRef().once('value').then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var email = childSnapshot.child('/email').val();
          console.log(email);
          console.log(vm.createdRoom.userList);
          if(vm.createdRoom.userList.indexOf(email) > -1) {
            validUsers.push(childSnapshot.key);
            console.log(childSnapshot.key);
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
