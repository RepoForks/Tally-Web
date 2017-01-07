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
        controllerAs: 'main',
        authenticate: false
      })

      .state('rooms', {
        url: '/rooms',
        templateUrl: 'app/room/list/roomList.html',
        controller: 'RoomListController',
        controllerAs: 'roomList',
        authenticate: true
      })

      // empty view
      .state('room', {
        url: '/room',
        templateUrl: 'app/room/room.html',
        authenticate: true
      })

      .state('room.create', {
        url: '/create',
        templateUrl: 'app/room/create/roomCreate.html',
        controller: 'RoomCreateController',
        controllerAs: 'roomCreate',
        authenticate: true
      })

      .state('room.detail', {
        url: '/room/:roomID/details',
        templateUrl: 'app/room/details/roomDetail.html',
        controller: 'RoomDetailController',
        controllerAs: 'roomDetail',
        authenticate: true
      });

    $urlRouterProvider.otherwise('/');
  }

})();
