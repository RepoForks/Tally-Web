(function() {
  'use strict';

  angular
    .module('tally')
    .directive('tallybar', tallybar);

  /** @ngInject */
  function tallybar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController($state, moment, authenticationService) {
      var vm = this;

      vm.isLoggedIn = function() {
        return authenticationService.isLoggedIn() == true;
        //return authenticationService.isLoggedIn();
      }

      vm.logout = function() {
        $state.go('home');
        return authenticationService.logout();
      }
    }
  }

})();
