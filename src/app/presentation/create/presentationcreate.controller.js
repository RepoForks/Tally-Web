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

    vm.poll = emptyPoll;

    // default empty poll
    vm.polls = [];

    // presentation name
    vm.name = '';
    // could be empty
    vm.room = $stateParams.roomID;

    vm.onAddNewPollButtonClicked = function() {
    }

    vm.onCreateButtonClicked = function() {

      // create the actual presentation
      var presentation = {
        name: vm.name,
        room: vm.room
      };

      // create the presentation in fb
      var presKey = firebaseService.getPresentationRef().push().key
      firebaseService.getPresentationRef().child('/' + presKey).set(presentation);

      var pollKey = firebaseService.getPollRef().child('/' + presKey).push(vm.poll).key;

      firebaseService.getPollResponsesRef().child('/' + pollKey).set(new Array(vm.poll.answers.length).fill(0));
      //firebaseService.getPollResponsesRef('/' + pollKey).push();
    }
  }
})();
