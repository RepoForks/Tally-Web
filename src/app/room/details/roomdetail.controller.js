(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomDetailController', RoomDetailController);

  /** @ngInject */
  function RoomDetailController($scope, $state, $stateParams, authenticationService, firebaseService, $firebaseArray) {
    var vm = this;

    $scope.creator = $stateParams.creator === authenticationService.getCurrentUser().uid;

    vm.roomID = $stateParams.roomID;
    $scope.roomID = vm.roomID;

    $scope.roomName = $stateParams.roomName;
    console.log($scope.roomName);

    vm.presentations = [];

    // TODO User auth required alonside their uid
    function getPresentations() {
      vm.presentations = $firebaseArray(firebaseService.getPresentationRoomRef().child('/' + $stateParams.roomID));
      console.log(vm.presentations);
    }

    vm.addPresentation = function() {
      $state.go('room.presentationcreate', {roomID: vm.roomID, roomName: $scope.roomName});
    }

    vm.navigateToPresentation = function(pres) {
      if($scope.creator) {
        console.log("Creator navigate");
        $state.go('presentation.poll', { presID: pres.$id, pollNum: 0, roomName: $scope.roomName, roomID: vm.roomID });
      } else {
        console.log("Joe Navigate");
        $state.go('presentation.respond', { presID: pres.$id, pollNum: 0, roomName: $scope.roomName, roomID: vm.roomID});
      }

    }

    getPresentations();

  }
})();
