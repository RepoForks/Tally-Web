(function() {
  'use strict';

  angular
  .module('tally')
  .controller('PresentationDetailController', PresentationDetailController);

  /** @ngInject */
  function PresentationDetailController($stateParams, firebaseService, $firebaseArray, $firebaseObject) {
    var vm = this;

    var chart = null;
    var presentationKey = $stateParams.presID;

    vm.presentation = {};
    vm.polls = [];
    vm.userResponses = [];

    function createPoll() {
      vm.polls = $firebaseArray(firebaseService.getPollRef().child('/' + presentationKey));

      vm.polls.$loaded().then(function(snapshot) {
        console.log(snapshot);

        // set base values for responses
        for(var i=0; i<vm.polls[0].answers.length; i++) {
          vm.userResponses.push(0);
        }

        chart = createChart();

        firebaseService.getPollResponsesRef().child('/' + vm.polls[0].$id).on('value', function(child) {
          console.log(child.val());
          chart.series[0].setData(child.val(), true);
          return child.val();
        });
      });
    }

    function createChart() {
      return new Highcharts.Chart({
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
      });
    }

    createPoll();
  }

})();
