(function() {
  'use strict';

  angular
    .module('tally')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      .state('rooms', {
        url: '/rooms',
        templateUrl: 'app/room/list/roomList.html',
        controller: 'RoomListController',
        controllerAs: 'roomList'
      })

      // empty view
      .state('room', {
        url: '/room',
        templateUrl: 'app/room/room.html'
      })

      .state('room.detail', {
        url: '/room/:roomID',
        templateUrl: 'app/room/details/roomDetail.html',
        controller: 'RoomDetailController',
        controllerAs: 'roomDetail'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
