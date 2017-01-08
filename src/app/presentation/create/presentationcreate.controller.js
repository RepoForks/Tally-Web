(function() {
  'use strict';

  angular
    .module('tally')
    .controller('PresentationCreateController', PresentationCreateController);

  /** @ngInject */
  function PresentationCreateController($stateParams, firebaseService, $firebaseArray) {
    var vm = this;

    vm.questionTypes = ['Multiple Choice', 'Open Form', 'Word Cloud'];
    vm.chartTypes = ['Bar Chart', 'Pie Chart']

    // overarching pres
    vm.presentation = {};
    // array of poll objects
    vm.polls = [{
      question: '',
      questionType: '',
      chartType: '',
      answers: [],
      locked: false,
      timelimit: 0
    }];

    // template vars
    vm.name = '';
    // could be empty
    vm.room = $stateParams.roomID;


    vm.onAddNewPollButtonClicked = function() {

    }

    vm.onCreateButtonClicked = function() {
      // create the actual presentation
      vm.presentation = {
        name: vm.name,
        room: vm.room
      };

      // create the presentation reference
      var presKey = firebaseService.getPresentationRef().push().key
      firebaseService.getPresentationRef().child('/' + presKey).set(vm.presentation);

      createPoll(presKey);
    }

    function createPoll(presKey) {

      if(!validatePoll()) {
        return false;
      }

      vm.polls.push({
        question: vm.question,
        questionType: vm.questionType,
        chartType: vm.chartType,
        answers: vm.answers,
        locked: false,
        timelimit: 0
      })

      // create the polls reference
      for(var i=0; i<vm.polls.length; i++) {
        var pollKey = firebaseService.getPollRef().child('/' + presKey).push(vm.polls[i]).key;
        //firebaseService.getPollResponsesRef().child('/' + pollKey).push(vm.polls[i])
          // create the poll response reference
          //console.log(poll.val());
          //firebaseService.getPollResponsesRef().child('/' + poll)
      }




    }

    function validatePoll() {
      return true;
      for(var i=0; i<vm.polls.length; i++) {

      }
    }

    function addNewAnswer() {
      vm.answerCount++;
    }

  }
})();
