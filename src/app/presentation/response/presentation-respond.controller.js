(function() {
  'use strict';

  angular
    .module('tally')
    .controller('PresentationRespondController', PresentationRespondController);

  function PresentationRespondController($scope, $state, $stateParams, firebaseService, $firebaseArray, profanityService, toastr) {
    var vm = this;

    vm.roomID = $stateParams.roomID;
    vm.roomName = $stateParams.roomName;
    vm.presID = $stateParams.presID;
    vm.pollNum = $stateParams.pollNum;

    vm.responses = {};
    vm.pollResponses = {};

    vm.polls = $firebaseArray(firebaseService.getPollRef().child('/' + vm.presID));


    function retrievePresentation() {
        // get the presentation
        vm.presentation = firebaseService.getPresentationRef().child('/' + vm.presID);
    }

    function retrievePolls() {
      // get array of polls

      vm.polls.$loaded(function(snap) {

        // get responses
        for(var i=0; i<vm.polls.length; i++) {
          var poll = vm.polls[i];
          console.log(poll);
          if(poll.questionType != "Open") {
            continue;
          }

          var pollID = vm.polls[i].$id;
          console.log(pollID);
          firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
            vm.responses[poll.$id] = child.val();
            vm.responses[poll.$id] = profanityService.check(vm.responses[poll.$id]);
            //console.log(profanityService.check($scope.responses[poll.$id]));
            digest();
          });

          //vm.responses[i] = $firebaseArray(firebaseService.getPollResponsesRef().child('/' + pollID));
        }

      });
    }

    vm.send = function() {
      if($scope.usrMsg == "") {
        return;
      }

      var poll = vm.polls[vm.pollNum];
      firebaseService.getPollResponsesRef().child('/' + poll.$id).push($scope.usrMsg);
      $scope.usrMsg = "";
    }

    vm.submitResponse = function(choice, index) {
      var poll = vm.polls[vm.pollNum];
      firebaseService.getPollResponsesRef().child('/' + poll.$id).child('/' + index).transaction(function(response) {
        if (response) {
          response = response + 1;
        }
        return response;
      });
      showSubmissionMessage();
    }

    function showSubmissionMessage() {
      toastr.success("Your vote has been casted!");
    }

    vm.nextPoll = function() {
      vm.pollNum = parseInt(vm.pollNum, 10) + 1;
      return vm.pollNum;
    }

    vm.previousPoll = function() {
      vm.pollNum = parseInt(vm.pollNum, 10) - 1;
      return vm.pollNum;
    }

    function digest() {
      if(!$scope.$$phase) {
        $scope.$digest();
      }
    }

    retrievePresentation();
    retrievePolls();

  }

})();
