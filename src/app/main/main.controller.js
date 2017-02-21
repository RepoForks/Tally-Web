(function() {
  'use strict';

  angular
    .module('tally')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($state, authenticationService, $timeout, toastr, firebaseService) {
    var vm = this;

    if(authenticationService.getCurrentUser() != null) {
      $state.go('room.list', {userID: authenticationService.getCurrentUser().uid});
    }

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1483804383853;
    vm.showToastr = showToastr;

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }
  }
})();
