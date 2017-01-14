(function() {
  'use strict';

  angular
    .module('tally')
    .service('authenticationService', authenticationService);

  /** @ngInject */
  function authenticationService($window, $rootScope, $firebaseAuth) {

    var auth = $firebaseAuth();

    var currentUser = $rootScope.authData;

    this.getAuth = getAuth;
    this.getCurrentUser = getCurrentUser;
    this.setCurrentUser = setCurrentUser;
    this.isLoggedIn = isLoggedIn;
    this.logout = logout;

    this.onAuthStateChanged = onAuthStateChanged;

    function getAuth() {
      return auth;
    }

    function getCurrentUser() {
      if($window.sessionStorage.currentUser != null) {
        return JSON.parse($window.sessionStorage.currentUser);
      }

      return null;
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

    function onAuthStateChanged() {
      return auth.$onAuthStateChanged(function(authData) {
        return authData;
      });
    }
  }

})();
