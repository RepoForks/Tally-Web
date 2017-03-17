(function() {
  'use strict';

  angular
    .module('tally')
    .controller('PresentationCreateController', PresentationCreateController);

  function PresentationCreateController($scope, $state, $stateParams, firebaseService, $firebaseArray, authenticationService) {
    var vm = this;

    $scope.titleEdit = false;
    $scope.editMode = ($stateParams.editMode == 'true');

    vm.creator = authenticationService.getCurrentUser().uid;

    var poll = {
      question: '',
      chartType: '',
      questionType: '',
      choices: ['', ''],
      profanityFilter: true,
      singleChoice: false
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
      'Multiple Choice': [vm.chartTypes[0], vm.chartTypes[1]],
      'Open': [vm.chartTypes[4]]
    };

    $scope.polls[0]['questionType'] = vm.questionTypes[0];
    $scope.polls[0]['chartType'] = null;

    $scope.clickQType = function(index, qType) {
      $scope.polls[index]['questionType'] = qType;
      $scope.clickCType(index, null);
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
      var presKey = firebaseService.getPresentationRef().push().key
      firebaseService.getPresentationRef().child('/' + presKey).set(vm.presentation);
      firebaseService.getPresentationRoomRef().child('/' + vm.presentation.roomID).child('/' + presKey).set(vm.presentation);

      for(var i=0; i<$scope.polls.length; i++) {
        delete $scope.polls[i].$$hashKey;
        var pollKey = firebaseService.getPollRef().child('/' + presKey).push($scope.polls[i]).key;

        if($scope.polls[i].questionType == 'Open') {
          firebaseService.getPollResponsesRef().child('/' + pollKey).child('/values').push("Default Message");
        } else {
          firebaseService.getPollResponsesRef().child('/' + pollKey).child('/values').set(new Array($scope.polls[i].choices.length).fill(0));
        }
       //firebaseService.getPollResponsesRef('/' + pollKey).push();
      }

      $state.go('presentation.poll', {roomName: $stateParams.roomName, roomID: $stateParams.roomID, presID: presKey, pollNum: 0});
    }

  }

})();
