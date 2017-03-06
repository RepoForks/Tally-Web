(function() {
  'use strict';

  angular
    .module('tally')
    .controller('ChatController', ChatController);

  function ChatController($scope, $stateParams) {
    var vm = this;

    var roomID = $stateParams.roomID;
  }
})();
