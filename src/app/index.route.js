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
        url: '/:roomID/details',
        templateUrl: 'app/room/details/roomDetail.html',
        controller: 'RoomDetailController',
        controllerAs: 'roomDetail',
        authenticate: true
      })

      .state('room.presentation', {
        url: '/presentation/:presID',
        templateUrl: 'app/presentation/details/presentationDetail.html',
        controller: 'PresentationDetailController',
        controllerAs: 'presDetail',
        authenticate: true
      })

      .state('room.presentationcreate', {
        url: '/:roomID/presentation/p/create',
        templateUrl: 'app/presentation/create/presentationCreate.html',
        controller: 'PresentationCreateController',
        controllerAs: 'presCreate',
        authenticate: true
      })

      .state('presentation', {
        url: '/presentation',
        templateUrl: 'app/presentation/presentation.html',
        authenticate: true
      })

      .state('presentation.create', {
        url: '/create',
        templateUrl: 'app/presentation/create/presentationCreate.html',
        controller: 'PresentationCreateController',
        controllerAs: 'presCreate',
        authenticate: true
      })

      .state('presentation.detail', {
        url: '/:presID/details',
        templateUrl: 'app/presentation/details/presentationDetail.html',
        controller: 'PresentationDetailController',
        controllerAs: 'presDetail',
        authenticate: true
      });

    $urlRouterProvider.otherwise('/');
  }

})();
