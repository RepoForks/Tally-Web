(function() {
  'use strict';

  angular
  .module('tally')
  .controller('PresentationDetailController', PresentationDetailController);

  // /** @ngInject */
  // function PresentationDetailController($stateParams, firebaseService, $firebaseArray, $firebaseObject) {
  //   var vm = this;
  //
  //   var chart = null;
  //   var presentationKey = $stateParams.presID;
  //
  //   vm.presentation = {};
  //   vm.polls = [];
  //   vm.userResponses = [];
  //
  //   function createPoll() {
  //     vm.polls = $firebaseArray(firebaseService.getPollRef().child('/' + presentationKey));
  //
  //     vm.polls.$loaded().then(function(snapshot) {
  //       console.log(snapshot);
  //
  //       // set base values for responses
  //       for(var i=0; i<vm.polls[0].answers.length; i++) {
  //         vm.userResponses.push(0);
  //       }
  //
  //       chart = createChart();
  //
  //       firebaseService.getPollResponsesRef().child('/' + vm.polls[0].$id).on('value', function(child) {
  //         console.log(child.val());
  //         chart.series[0].setData(child.val(), true);
  //         return child.val();
  //       });
  //     });
  //   }
  //
  //   function createChart() {
  //     return new Highcharts.Chart({
  //       chart: {
  //         renderTo: 'poll-wrapper',
  //         defaultSeriesType: 'column'
  //       },
  //       title: {
  //         text: vm.polls[0].question
  //       },
  //       xAxis: {
  //         categories: vm.polls[0].answers
  //       },
  //       yAxis: {
  //         title: {
  //           text: "Test"
  //         }
  //       },
  //       series: [{
  //         name: 'Random data',
  //         data: vm.userResponses
  //         //data: $scope.userResponses
  //       }]
  //     });
  //   }
  //
  //   createPoll();
  // }

  function PresentationDetailController($scope, $stateParams, $firebaseObject, $firebaseArray, firebaseService) {
    var vm = this;

    // <presentation>
    vm.presentation = {};
    vm.polls = [];
    vm.pollsResponses = [];

    $scope.responses = {};
    $scope.chartList = {js: 'ss'};
    $scope.chartOptions = {};

    vm.charts = {};

    var presKey = $stateParams.presID;

    function retrievePresentation() {

      vm.presentation = firebaseService.getPresentationRef().child('/' + presKey);

      vm.polls = $firebaseArray(firebaseService.getPollRef().child('/' + presKey));

      vm.polls.$loaded(snap => {

        vm.polls.forEach(poll => {
          $scope.chartOptions[poll.$id] = createOptions(poll);

          firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
            $scope.responses[poll.$id] = child.val();
            $scope.chartOptions[poll.$id].series[0].data = child.val();
            $scope.$digest();
            console.log(child.val());
          });
        });

      });

      //
      // // when the polls are loaed
      // vm.polls.$loaded(function(snapshot) {
      //
      //   vm.polls.forEach(poll => {
      //
      //     vm.pollsResponses[poll.$id] = $firebaseArray(firebaseService.getPollResponsesRef().child('/' + poll.$id));
      //
      //     vm.pollsResponses[poll.$id].$loaded(function(child) {
      //       vm.charts[poll.$id] = createChart(poll);
      //
      //     });
      //
      //     firebaseService.getPollResponsesRef().child('/' + poll.$id).on('value', function(child) {
      //       vm.pollsResponses[poll.$id] = child.val();
      //       vm.charts[poll.$id].series[0].data = vm.pollsResponses[poll.$id];
      //       console.log(child.val());
      //     });
      //     // console.log(vm.charts[poll.$id].series[0]);
      //
      //
      //
      //   });
      //
      //  })
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
