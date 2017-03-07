(function() {
  'use strict';

  angular
    .module('tally')
    .directive('sidebar', sidebar);

  function sidebar() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: true,
      templateUrl: 'app/components/sidebar/sidebar.html',
      controller: SidebarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function SidebarController(authenticationService) {
    var vm = this;

    vm.getUserID = function() {
      if(vm.loggedIn()) {
        return authenticationService.getCurrentUser().uid;
      }

      return null;
    }

    vm.loggedIn = function() {
      return authenticationService.isLoggedIn();
    }
  }

})();
