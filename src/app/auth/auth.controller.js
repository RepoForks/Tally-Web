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
      authenticationService.signInWithEmailAndPassword($scope.email, $scope.password);
    }

    vm.register = function() {
      console.log($scope.email);
      authenticationService.registerWithEmailAndPassword($scope.email, $scope.password);
    }

    vm.forgottenPassword = function() {

    }

  }


}())
