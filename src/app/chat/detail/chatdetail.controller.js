(function() {
  'use strict';

  angular
    .module('tally')
    .controller('ChatDetailController', ChatDetailController);

  function ChatDetailController($scope, $stateParams, firebaseService, $firebaseArray, $uibModal) {
    var vm = this;

    vm.moduleID = $stateParams.moduleID;
    vm.moduleName = $stateParams.moduleName;

    $scope.messages = $firebaseArray(firebaseService.getChatRef().child('/' + vm.moduleID));

    $scope.messages.$loaded(function(child) {
      console.log(child);
    });

    vm.showDialog = function(msg) {
      var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'app/presentation/details/openFormModal.html',
         controller: function() {
           var vm = this;
           vm.text = msg.message;
           vm.time = msg.date;
         },
         controllerAs: 'vm',
         size: 'lg'
      });
    }

    vm.send = function() {
      if($scope.usrMsg != "") {
        $scope.messages.push({date: Date.now(), message: $scope.usrMsg});
        $scope.usrMsg = "";
      }
    }
    
  }
})();
