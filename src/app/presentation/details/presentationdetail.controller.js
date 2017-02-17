(function() {
  'use strict';

  angular
  .module('tally')
  .controller('PresentationDetailController', PresentationDetailController);

  function PresentationDetailController($scope, $stateParams, $firebaseObject, $firebaseArray, firebaseService, ChartService) {
    var vm = this;

    // <presentation>
    vm.presRef = null;

    vm.presentation = {};
    vm.polls = [];
    vm.pollsResponses = [];

    $scope.responses = {};
    $scope.chartOptions = {};

    vm.presKey = $stateParams.presID;
    vm.pollNum = $stateParams.pollNum;

    function retrievePresentation() {

      vm.presentation = firebaseService.getPresentationRef().child('/' + vm.presKey);

      vm.polls = $firebaseArray(firebaseService.getPollRef().child('/' + vm.presKey));

      vm.polls.$loaded(snap => {

        vm.polls.forEach(poll => {
          // $scope.chartOptions[poll.$id] = createOptions(poll);
          $scope.chartOptions[poll.$id] = ChartService.createBar(poll);
          console.log($scope.chartOptions[poll.$id]);

          firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
            $scope.responses[poll.$id] = child.val();
            $scope.chartOptions[poll.$id].series[0].data = child.val();

            if(!$scope.$$phase) {
              $scope.$digest();
              console.log(child.val());
            }
          });
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

        case 'BAR':
          break;

        case 'PIE':
          break;

        case 'WORD_CLOUD':
          break;

        case 'RANK':
          break;

        default:
          break;

      }

    }

    function createOptions(poll) {
      return {
        chart: {
          animation: {
            "duration": 10
          },
          defaultSeriesType: 'column'
        },
        title: {
          text: poll.question
        },
        xAxis: {
          categories: poll.answers
        },
        yAxis: {
          title: {
            text: "Test"
          }
        },
        series: [{
          name: 'Random data',
          animation: {
            duration: 2000
          },
          data: []
        }]
      }
    }

    retrievePresentation();
  }

})();
