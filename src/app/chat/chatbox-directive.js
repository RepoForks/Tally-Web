(function() {
  'use strict';

  angular
    .module('tally')
    .directive('chatbox', chatbox);

  function chatbox() {
    var directive = {
      restrict: 'E',
      replace: true,
      scope: {
        title: '@',
        room: '@'
      },
      templateUrl: 'app/chat/chatbox.html',
      controller: ChatboxController,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;
  }

  function ChatboxController($scope, firebaseService, $firebaseArray) {
    var vm = this;

    $scope.max = false;
    $scope.boxClass = "chatbox-wrapper";

    $scope.visible = false;

    $scope.messages = $firebaseArray(firebaseService.getChatRef().child('/' + vm.room));

    vm.toggleMax = function() {
      $scope.max = !$scope.max;

      if($scope.max) {
        $scope.boxClass = "chatbox-wrapper-max";
      } else {
        $scope.boxClass = "chatbox-wrapper";
      }
    }

    vm.close = function() {
      $scope.visible = false;
    }

    vm.open = function() {
      $scope.visible = true;
    }

    vm.send = function() {
      if($scope.usrMsg !== "") {
        sendMessage();
      }
    }

    function sendMessage() {
      var msg = {
        message: $scope.usrMsg,
        date: Date.now()
      };

      firebaseService.getChatRef().child('/' + vm.room).push(msg);
    }
  }

})();
