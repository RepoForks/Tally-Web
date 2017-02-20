(function() {
  'use strict';

  angular
    .module('tally')
    .directive('sidebar', sidebar);

  function sidebar() {
    var directive = {
      restrict: 'E',
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
      return authenticationService.getCurrentUser().uid;
    }

    vm.loggedIn = function() {
      return authenticationService.isLoggedIn();
    }
  }

}());
