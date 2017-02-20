(function() {
  'use strict';

  angular
    .module('tally')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($state, authenticationService, $timeout, webDevTec, toastr, firebaseService) {
    var vm = this;

    if(authenticationService.getCurrentUser() != null) {
      $state.go('room.list', {userID: authenticationService.getCurrentUser().uid});
    }

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1483804383853;
    vm.showToastr = showToastr;

    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
