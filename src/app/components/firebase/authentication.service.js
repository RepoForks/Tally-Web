(function() {
  'use strict';

  angular
    .module('tally')
    .service('authenticationService', authenticationService);

  /** @ngInject */
  function authenticationService($rootScope, $firebaseAuth) {

    var auth = $firebaseAuth();

    var currentUser = $rootScope.authData;

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
