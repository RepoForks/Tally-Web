(function() {
  'use strict';

  angular
  .module('tally')
  .directive('time', time);

  function time() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/chat/time.html',
      scope: {
        time: '='
      },
      controller: TimeController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function TimeController() {
    var vm = this;

    vm.relativeDate = moment(vm.time).fromNow();
  }

})();
