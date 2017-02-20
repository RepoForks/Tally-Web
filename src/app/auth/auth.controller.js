(function() {
  'use strict';

  angular
    .module('tally')
    .controller('AuthController', AuthController);

  function AuthController($state, $scope, authenticationService) {
    var vm = this;

    vm.type = $state.current.name;

    $scope.email = "";
    $scope.password = "";

    vm.login = function() {
      authenticationService.signInWithEmailAndPassword($scope.email, $scope.password).then(s => {
        console.log(s);
        handleAuthSubmission(s);
      });
    }

    vm.register = function() {
      authenticationService.registerWithEmailAndPassword($scope.email, $scope.password).then(s => {
        handleAuthSubmission(s);
      });
    }

    vm.forgottenPassword = function() {

    }

    function handleAuthSubmission(val) {
      if(val.message == undefined) {
        // success: redirect
        $state.go('room.list', {userID: val.uid});
      } else {
        console.log(s.message);
      }
    }

  }


}())
