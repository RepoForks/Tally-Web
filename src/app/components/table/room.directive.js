(function() {
  'use strict';

  angular
    .module('tally')
    .directive('roomTable', roomTable);

  /** @ngInject */
  function roomTable() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/table/roomTable.html',
      controller: RoomTableController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function RoomTableController() {
      var vm = this;
      
    }
  }

})();
