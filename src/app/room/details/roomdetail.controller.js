(function() {
  'use strict';

  angular
    .module('tally')
    .controller('RoomDetailController', RoomDetailController);

  /** @ngInject */
  function RoomDetailController($scope, $stateParams, firebaseService, $firebaseArray) {
    var vm = this;

    vm.presentations = [];

    // we can retrieve the roomID from url state
    console.log($stateParams.roomID);

    // TODO User auth required alonside their uid
    function getPresentations() {
      vm.presentations = $firebaseArray(firebaseService.getPresentationRoomRef().child('-K_F8UImQyD9P5wU6RZB'));
      console.log(vm.presentations);
    }

    getPresentations();

  }
})();
