(function() {
  'use strict';

  angular
    .module('tally')
    .service('ChartService', ChartService);

  function ChartService() {

    this.createBar = function(poll) {
      var options = getCommonOptions(poll);
      options.type = 'bar';
      return options;
    }

    this.createPie = function(poll) {
      var options = getCommonOptions(poll);
      options.type = 'pie';
      return options;
    }

    this.createRank = function(poll) {

    }

    this.createScale = function(poll) {

    }

    this.createOpenForm = function(poll) {
      var options = {type: 'form'};
      return options;
    }

    function getCommonOptions(poll) {
      return {
        animation: false,
        chart: {
          animation: {
            duration: 10
          }
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        },
        labels: poll.choices,
        series: [{
          name: 'Answers',
          data: poll.choices
        }]
      }
    }

  }

}());
