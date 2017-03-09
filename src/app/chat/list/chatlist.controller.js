(function() {
  'use strict';

  angular
    .module('tally')
    .controller('ChatListController', ChatListController);

  function ChatListController($scope, $state, $stateParams, authenticationService, firebaseService, $firebaseArray) {
    var vm = this;

    vm.userID = $stateParams.userID;

    $scope.eChats = [];
    $scope.cChats = [];

    vm.enrolledRooms = $firebaseArray(firebaseService.getUserRoomRef().child('/' + vm.userID));
    vm.createdRooms = $firebaseArray(firebaseService.getUserCreatedRoomRef().child('/' + vm.userID));

    vm.enrolledRooms.$loaded(function(snap) {
      snap.forEach(function(child) {
        console.log(child);
        firebaseService.getChatRef().child('/' + child.$id).orderByChild('date').on('value', function(snapshot) {
          $scope.eChats.push(snapshot.val());
          digest();
        });
      });
    });

    vm.createdRooms.$loaded(function(snap) {
      snap.forEach(function(child) {
        firebaseService.getChatRef().child('/' + child.$id).once('value', function(snapshot) {
          console.log(snapshot.val());
          $scope.cChats.push(snapshot.val());
          digest();
        });
      });
    });

    vm.navigateToChat = function(roomID, roomName) {
      console.log(roomID);
      $state.go('chat.detail', {moduleID: roomID, moduleName: roomName});
    }

    function digest() {
      if(!$scope.$$phase) {
        $scope.$digest();
      }
    }

  }



})();
