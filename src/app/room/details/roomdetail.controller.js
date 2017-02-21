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

    vm.presentations = [];

    // TODO User auth required alonside their uid
    function getPresentations() {
      vm.presentations = $firebaseArray(firebaseService.getPresentationRoomRef().child('/' + $stateParams.roomID));
      console.log(vm.presentations);
    }

    vm.addPresentation = function() {
      $state.go('room.presentationcreate', {roomID: vm.roomID});
    }

    vm.navigateToPresentation = function(pres) {
      $state.go('presentation.poll', { presID: pres.$id, pollNum: 0 });
    }

    getPresentations();

  }
})();
