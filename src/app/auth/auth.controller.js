(function() {
  'use strict';

  angular
    .module('tally')
    .controller('AuthController', AuthController);

  function AuthController($state, $scope, authenticationService, toastr) {
    var vm = this;

    vm.type = $state.current.name;

    $scope.email = "";
    $scope.password = "";

    vm.onSubmit = function() {
      if(vm.type === 'login') {
        vm.login();
      } else {
        vm.register();
      }
    }

    vm.login = function() {
      authenticationService.signInWithEmailAndPassword($scope.email, $scope.password).then(function(s) {
        console.log(s);
        handleAuthSubmission(s);
      });
    }

    vm.register = function() {
      authenticationService.registerWithEmailAndPassword($scope.email, $scope.password).then(function(s) {
        handleAuthSubmission(s);
      });
    }

    vm.forgottenPassword = function() {

    }

    function handleAuthSubmission(val) {
      if(val.message == undefined) {
        // success: redirect
        toastr.success("Welcome back.");
        $state.go('room.list', {userID: val.uid});
      } else {
        toastr.error(val.message);
      }
    }

  }


})();
