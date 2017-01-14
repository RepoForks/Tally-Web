(function() {
  'use strict';

  angular
    .module('tally')
    .directive('acmeNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    var directive = {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          creationDate: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    /** @ngInject */
    function NavbarController(moment, authenticationService) {
      var vm = this;

      // "vm.creationDate" is available by directive option "bindToController: true"
      vm.relativeDate = moment(vm.creationDate).fromNow

      vm.showSignedInLinks = function() {
        return authenticationService.isLoggedIn() == true;
        //return authenticationService.isLoggedIn();
      }

      vm.onSignInClicked = function() {
        console.log("SIgned In Clicked");
        authenticationService.getAuth().$signInWithEmailAndPassword('rex@email.com', 'scania93');
      }

      vm.onSignUpClicked = function() {
        // TODO Show dialog
      }

      vm.onLogoutClicked = function() {
        return authenticationService.logout();
      }
    }
  }

})();
