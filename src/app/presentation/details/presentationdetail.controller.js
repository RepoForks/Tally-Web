(function() {
  'use strict';

  angular
    .module('tally')
    .controller('PresentationDetailController', PresentationDetailController);

  /** @ngInject */
  function PresentationDetailController($stateParams, firebaseService, $firebaseArray) {
    var vm = this;

    var chart = null;

    var presentationKey = $stateParams.presID;
    console.log(presentationKey);

    vm.presentation = {};

    vm.polls = [];

    vm.userResponses = [];

    function createPoll() {

      vm.polls.push($firebaseArray(firebaseService.getPollRef().child('/-KaSbbcuhI4cAq1njdtc')));
      chart = createChart();
      vm.userResponses = $firebaseArray(firebaseService.getPollResponsesRef().child('/-KaSbbcuhI4cAq1njdtc'));

    }

    function createChart() {
      console.log(vm.polls[0].answers);
      var options = {
          chart: {
              renderTo: 'poll-wrapper',
              defaultSeriesType: 'column'
          },
          title: {
              text: vm.polls[0].question
          },
          xAxis: {
              categories: vm.polls[0].answers
          },
          yAxis: {
              title: {
                  text: "Test"
              }
          },
          series: [{
              name: 'Random data',
              data: vm.userResponses
              //data: $scope.userResponses
          }]
      };

      return new Highcharts.Chart(options);
    }

    createPoll();
  }

})();
