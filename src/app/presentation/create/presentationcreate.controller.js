(function() {
  'use strict';

  angular
    .module('tally')
    .controller('PresentationCreateController', PresentationCreateController);

  /** @ngInject */
  // function PresentationCreateController($stateParams, firebaseService, $firebaseArray) {
  //   var vm = this;
  //
  //   vm.questionTypes = ['Multiple Choice', 'Open Form', 'Word Cloud'];
  //   vm.chartTypes = ['Bar Chart', 'Pie Chart']
  //
  //   var emptyPoll = {
  //     question: '',
  //     questionType: '',
  //     chartType: '',
  //     answers: ['', ''],
  //     locked: false,
  //     timelimit: 0
  //   }
  //
  //   vm.poll = {
  //     question: '',
  //     questionType: '',
  //     chartType: '',
  //     answers: ['', ''],
  //     locked: false,
  //     timelimit: 0,
  //     numPolls: 1
  //   };
  //
  //   // default empty poll
  //   vm.polls = [];
  //
  //   // presentation name
  //   vm.name = '';
  //   // could be empty
  //   vm.room = $stateParams.roomID;
  //   console.log(vm.room);
  //
  //   vm.onAddNewPollButtonClicked = function() {
  //     vm.polls.push(angular.copy(vm.poll));
  //     console.log(vm.polls);
  //   }
  //
  //   vm.onCreateButtonClicked = function() {
  //
  //     // create the actual presentation
  //     var presentation = {
  //       name: vm.name,
  //       room: vm.room,
  //       dateCreated: Date.now(),
  //       numPolls: vm.polls.length,
  //       currentPoll: 0
  //     };
  //
  //     console.log(presentation);
  //
  //     // create the presentation in fb
  //     var presKey = firebaseService.getPresentationRef().push().key
  //     firebaseService.getPresentationRef().child('/' + presKey).set(presentation);
  //     firebaseService.getPresentationRoomRef().child('/' + vm.room).child('/' + presKey).set(presentation);
  //
  //     for(var i=0; i<vm.polls.length; i++) {
  //       console.log(vm.polls[i]);
  //       delete vm.polls[i].$$hashKey;
  //       var pollKey = firebaseService.getPollRef().child('/' + presKey).push(vm.polls[i]).key;
  //       firebaseService.getPollResponsesRef().child('/' + pollKey).set(new Array(vm.polls[i].answers.length).fill(0));
  //       //firebaseService.getPollResponsesRef('/' + pollKey).push();
  //     }
  //   }
  // }

  function PresentationCreateController($scope, $state, $stateParams, firebaseService, $firebaseArray) {
    var vm = this;

    $scope.titleEdit = false;
    $scope.editMode = ($stateParams.editMode == 'true');

    /**

      var poll = {
        question: 'Question 1',
        chartType: 'Bar',
        questionType: 'Multiple Choice',
        choices: ['c1', 'c2', 'c3']

        profanityFilter: true
      }
    */

    var poll = {
      question: '',
      chartType: '',
      questionType: '',
      choices: ['', ''],
      profanityFilter: true
    }

    $scope.polls = [angular.copy(poll)];

    vm.presentation = {
      name: '',
      roomID: $stateParams.roomID,
      dateCreated: Date.now(),
      dateLastModified: Date.now(),
      numPolls: $scope.polls.length,
      currentPoll: 0
    };

    vm.questionTypes = {
      0: 'Multiple Choice',
      1: 'Open'
    };

    vm.chartTypes = ['Bar', 'Pie', 'Rank', 'Scales', 'Form'];

    vm.possbileTypes = {
      'Multiple Choice': [vm.chartTypes[0], vm.chartTypes[1], vm.chartTypes[2], vm.chartTypes[3]],
      'Open': [vm.chartTypes[4]]
    };

    $scope.polls[0]['questionType'] = vm.questionTypes[0];
    $scope.polls[0]['chartType'] = null;

    $scope.clickQType = function(index, qType) {
      console.log(index);
      $scope.polls[index]['questionType'] = qType;
      $scope.clickCType(index, null);

      console.log(vm.possbileTypes[$scope.polls[index]['questionType']]);
    }

    $scope.clickCType = function(index, cType) {
      $scope.polls[index]['chartType'] = cType;
    }

    // add new poll empty data
    vm.addEmptyPoll = function() {
      $scope.polls.push(angular.copy(poll));
      vm.presentation.numPolls++;
    }

    vm.removePoll = function(index) {
      $scope.polls[index].pop();
      vm.presentation.numPolls--;
    }

    vm.createPoll = function() {
      console.log(vm.presentation);
      console.log($scope.polls);

      var presKey = firebaseService.getPresentationRef().push().key
      firebaseService.getPresentationRef().child('/' + presKey).set(vm.presentation);
      firebaseService.getPresentationRoomRef().child('/' + vm.presentation.roomID).child('/' + presKey).set(vm.presentation);

      for(var i=0; i<$scope.polls.length; i++) {
        console.log($scope.polls[i]);
        delete $scope.polls[i].$$hashKey;
        var pollKey = firebaseService.getPollRef().child('/' + presKey).push($scope.polls[i]).key;

        if($scope.polls[i].questionType == 'Open') {
          firebaseService.getPollResponsesRef().child('/' + pollKey).push("Default Message");
        } else {
          firebaseService.getPollResponsesRef().child('/' + pollKey).set(new Array($scope.polls[i].choices.length).fill(0));
        }
       //firebaseService.getPollResponsesRef('/' + pollKey).push();
      }
    }

  }

})();
