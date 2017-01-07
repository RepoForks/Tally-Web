(function() {
  'use strict';

  angular
    .module('tally')
    .service('authenticationService', authenticationService);

  /** @ngInject */
  function authenticationService($firebaseAuth) {

    var auth = $firebaseAuth();

    var currentUser = null;

    this.getAuth = getAuth;
    this.getCurrentUser = getCurrentUser;
    this.setCurrentUser = setCurrentUser;
    this.isLoggedIn = isLoggedIn;
    this.logout = logout;

    function getAuth() {
      return auth;
    }

    function getCurrentUser() {
      return currentUser;
    }

    function setCurrentUser(authData) {
        currentUser = authData;
    }

    function isLoggedIn() {
      return currentUser != null;
    }

    function logout() {
      auth.$signOut();
    }
  }

})();
