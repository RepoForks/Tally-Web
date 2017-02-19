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

    var emptyPoll = {
      question: '',
      questionType: '',
      chartType: '',
      answers: ['', ''],
      locked: false,
      timelimit: 0
    }

    vm.poll = {
      question: '',
      questionType: '',
      chartType: '',
      answers: ['', ''],
      locked: false,
      timelimit: 0,
      numPolls: 1
    };

    // default empty poll
    vm.polls = [];

    // presentation name
    vm.name = '';
    // could be empty
    vm.room = $stateParams.roomID;
    console.log(vm.room);

    vm.onAddNewPollButtonClicked = function() {
      vm.polls.push(angular.copy(vm.poll));
      console.log(vm.polls);
    }

    vm.onCreateButtonClicked = function() {

      // create the actual presentation
      var presentation = {
        name: vm.name,
        room: vm.room,
        dateCreated: Date.now(),
        numPolls: vm.polls.length,
        currentPoll: 0
      };

      console.log(presentation);

      // create the presentation in fb
      var presKey = firebaseService.getPresentationRef().push().key
      firebaseService.getPresentationRef().child('/' + presKey).set(presentation);
      firebaseService.getPresentationRoomRef().child('/' + vm.room).child('/' + presKey).set(presentation);

      for(var i=0; i<vm.polls.length; i++) {
        console.log(vm.polls[i]);
        delete vm.polls[i].$$hashKey;
        var pollKey = firebaseService.getPollRef().child('/' + presKey).push(vm.polls[i]).key;
        firebaseService.getPollResponsesRef().child('/' + pollKey).set(new Array(vm.polls[i].answers.length).fill(0));
        //firebaseService.getPollResponsesRef('/' + pollKey).push();
      }
    }
  }
})();
