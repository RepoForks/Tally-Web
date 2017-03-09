(function() {
  'use strict';

  angular
  .module('tally')
  .controller('PresentationDetailController', PresentationDetailController);

  function PresentationDetailController($scope, $stateParams, $uibModal, $firebaseObject, $firebaseArray, firebaseService, ChartService, profanityService) {
    var vm = this;

    // <presentation>
    vm.presRef = null;

    vm.presentation = {};
    vm.polls = [];
    vm.pollsResponses = [];

    $scope.responses = {};
    $scope.chartOptions = {};

    $scope.roomName = $stateParams.roomName;
    $scope.roomID = $stateParams.roomID;
    console.log($scope.roomID);
    console.log($scope.roomName);

    vm.presKey = $stateParams.presID;
    vm.pollNum = $stateParams.pollNum;

    function retrievePresentation() {

      vm.presentation = firebaseService.getPresentationRef().child('/' + vm.presKey);

      vm.polls = $firebaseArray(firebaseService.getPollRef().child('/' + vm.presKey));

      vm.polls.$loaded(function(snap) {

        vm.polls.forEach(function(poll) {
          createPoll(poll);
          // $scope.chartOptions[poll.$id] = createOptions(poll);

          // $scope.chartOptions[poll.$id] = createPoll(poll);

          // firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
          //   $scope.responses[poll.$id] = child.val();
          //
          //   if(poll.chartType != 'Open') {
          //     $scope.chartOptions[poll.$id].series[0].data = child.val();
          //   } else {
          //
          //   }
          //
          //   if(!$scope.$$phase) {
          //     $scope.$digest();
          //   }
          // });
        });

      });
    }

    vm.nextPoll = function nextPoll() {
      vm.pollNum = parseInt(vm.pollNum, 10) + 1;
      vm.presentation.child('/currentPoll').set(vm.pollNum);
      return vm.pollNum;
    }

    vm.previousPoll = function previousPoll() {
      vm.pollNum = parseInt(vm.pollNum, 10) - 1;
      vm.presentation.child('/currentPoll').set(vm.pollNum);
      return vm.pollNum;
    }

    function createPoll(poll) {

      switch(poll.chartType) {

        case 'Bar':
          handleBarChart(poll);
          break;

        case 'Pie':
          handlePieChart(poll);
          break;

        case 'Scales':
          handleScales(poll);
          break;

        case 'Rank':
          handleRank(poll);
          break;

        case 'Form':
          handleForm(poll);
          break;

        default:
          break;

      }

    }

    function handleForm(poll) {
      $scope.chartOptions[poll.$id] = ChartService.createOpenForm(poll);

      firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
        $scope.responses[poll.$id] = child.val();
        $scope.responses[poll.$id] = profanityService.check($scope.responses[poll.$id]);
        //console.log(profanityService.check($scope.responses[poll.$id]));
        digest();
      });
    }

    function handlePieChart(poll) {
      $scope.chartOptions[poll.$id] = ChartService.createPie(poll);

      firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
        $scope.responses[poll.$id] = child.val();
        $scope.chartOptions[poll.$id].series[0].data = child.val();
        digest();
      });
    }

    function handleBarChart(poll) {
      $scope.chartOptions[poll.$id] = ChartService.createBar(poll);

      firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
        $scope.responses[poll.$id] = child.val();
        digest();
      });
    }

    function handleRank(poll) {

    }

    function handleScales(poll) {

    }

    function digest() {
      if(!$scope.$$phase) {
        $scope.$digest();
      }
    }

    vm.showFormDialog = function(text) {
      var modalInstance = $uibModal.open({
         animation: true,
         templateUrl: 'app/presentation/details/openFormModal.html',
         controller: function() {
           var vm = this;
           vm.text = text;
         },
         controllerAs: 'vm',
         size: 'lg'
      });
    }

    retrievePresentation();
  }

})();
