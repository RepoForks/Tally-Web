(function() {
  'use strict';

  angular
    .module('tally')
    .service('authenticationService', authenticationService);

  /** @ngInject */
  function authenticationService($window, $rootScope, $state, $firebaseAuth, UserSerivce) {

    var auth = $firebaseAuth();

    var currentUser = $rootScope.authData;

    this.getAuth = getAuth;
    this.getCurrentUser = getCurrentUser;
    this.setCurrentUser = setCurrentUser;
    this.isLoggedIn = isLoggedIn;
    this.logout = logout;
    this.signInWithEmailAndPassword = signInWithEmailAndPassword;
    this.registerWithEmailAndPassword = registerWithEmailAndPassword;

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

    function signInWithEmailAndPassword(email, password) {
      //auth.$signInWithEmailAndPassword(email, password);
      return auth.$signInWithEmailAndPassword(email, password).then(function(snap) {
        return snap;
      }).catch(function(error) {
        return error;
      })
    }

    function registerWithEmailAndPassword(email, password) {
      return auth.$createUserWithEmailAndPassword(email, password)
        .then(function(child) {
          UserSerivce.createUserEntry(child);
          return child;
        })
        .catch(function(err) {
          console.log(err);
          return err;
        })
    }

    function onAuthStateChanged() {
      return auth.$onAuthStateChanged(function(authData) {
        return authData;
      });
    }
  }

})();
