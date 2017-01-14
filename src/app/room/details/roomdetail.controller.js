(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomDetailController', RoomDetailController);

  /** @ngInject */
  function RoomDetailController($scope, $stateParams, firebaseService, $firebaseArray) {
    var vm = this;

    vm.roomID = $stateParams.roomID;

    vm.presentations = [];

    // TODO User auth required alonside their uid
    function getPresentations() {
      vm.presentations = $firebaseArray(firebaseService.getPresentationRoomRef().child('/' + $stateParams.roomID));
      console.log(vm.presentations);
    }

    getPresentations();

  }
})();
