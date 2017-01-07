(function() {
  'use strict';

  angular
    .module('tally')
    .service('firebaseService', firebaseService);

  /** @ngInject */
  function firebaseService(firebase, $firebaseObject, $firebaseArray) {

    var usersRefStr = 'user';
    var userRoomRefStr = 'user-rooms'
    var roomRefStr = 'rooms';
    var presentationRefStr = 'presentations';
    var presentationRoomRefStr = 'presentation-rooms';
    var pollsRefStr = 'polls';
    var pollsResponsesRefStr = 'poll-responses';
    var pollPresentationRefStr = 'poll-rooms';

    var rootRef = firebase.database();

    this.getUserRef = getUserRef;
    this.getUserRoomRef = getUserRoomRef;
    this.getRoomRef = getRoomRef;
    this.getPresentationRef = getPresentationRef;
    this.getPresentationRoomRef = getPresentationRoomRef;
    this.getPollRef = getPollRef;
    this.getPollPresentationRef = getPollPresentationRef;
    this.getPollResponsesRef = getPollResponsesRef;

    function getUserRef() {
      return rootRef.ref(usersRefStr);
    }

    function getUserRoomRef() {
      return rootRef.ref(userRoomRefStr);
    }

    function getRoomRef() {
      return rootRef.ref(roomRefStr);
    }

    function getPresentationRef() {
      return rootRef.ref(presentationRefStr);
    }

    function getPresentationRoomRef() {
      return rootRef.ref(presentationRoomRefStr);
    }

    function getPollRef() {
      return rootRef.ref(pollsRefStr);
    }

    function getPollPresentationRef() {
      return rootRef.ref(pollPresentationRefStr);
    }

    function getPollResponsesRef() {
      return rootRef.ref(pollsResponsesRefStr);
    }

  }

})();
