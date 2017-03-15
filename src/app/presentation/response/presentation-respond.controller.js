(function() {
  'use strict';

  angular
  .module('tally')
  .controller('PresentationRespondController', PresentationRespondController);

  function PresentationRespondController($scope, $state, $stateParams, authenticationService, firebaseService, $firebaseArray, profanityService, toastr) {
    var vm = this;

    vm.roomID = $stateParams.roomID;
    vm.roomName = $stateParams.roomName;
    vm.presID = $stateParams.presID;
    vm.pollNum = $stateParams.pollNum;

    vm.responses = {};
    vm.pollResponses = {};

    vm.userID = authenticationService.getCurrentUser().uid;

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
          // if(poll.questionType != "Open") {
          //   continue;
          // }

          var pollID = vm.polls[i].$id;
          console.log(poll);
          firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
            if(poll.questionType == "Open") {
              vm.responses[poll.$id] = $firebaseArray(firebaseService.getPollResponsesRef().child('/' + poll.$id));
            } else {
              vm.responses[poll.$id] = child.val();
            }

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

      if(poll.profanityFilter) {
        firebaseService.getPollResponsesRef().child('/' + poll.$id).push(profanityService.check($scope.usrMsg));
      } else {
        firebaseService.getPollResponsesRef().child('/' + poll.$id).push($scope.usrMsg);
      }


      $scope.usrMsg = "";
    }

    vm.hasResponded = function() {
      // return firebaseService.getPollResponsesRef()
      //   .child('/' + vm.polls[vm.pollNum].$id)
      //   .child('/submission')
      //   .child('/' + vm.userID).on('value', function(snap) {
      //     return snap !== null;
      //   });

    }

    vm.submitResponse = function(choice, index) {
      var poll = vm.polls[vm.pollNum];

      // only allow one vote per user
      if(poll.singleChoice) {
        submitSingleChoice(poll.$id, index);
      } else {
        submit(poll.$id, index);
      }
    }

    function submitSingleChoice(pollID, index) {
      var obj = {};
      var uid = authenticationService.getCurrentUser().uid;
      console.log(uid);
      obj[uid] = index;
      console.log(obj);

      firebaseService.getPollResponsesRef()
        .child('/' + pollID)
        .child('/submission')
        .child('/' + uid).on('value', function(snap) {
          console.log(snap.val());
          if(snap.val() == null) {
            firebaseService.getPollResponsesRef()
              .child('/' + pollID)
              .child('/submission')
              .set(obj);

            submit(pollID, index);
          } else {
            showAlreadySubmittedMessage(index);
          }
        });
    }

    function submit(pollID, index) {
      firebaseService.getPollResponsesRef()
        .child('/' + pollID)
        .child('/' + String(index))
        .transaction(function(currentValue) {
          return (currentValue || 0) + 1;
        });
        showSubmissionMessage();
    }

    function showSubmissionMessage(index) {
      toastr.success("Your vote has been casted!");
    }

    function showAlreadySubmittedMessage() {
      toastr.info("You have already submitted your vote.");
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
