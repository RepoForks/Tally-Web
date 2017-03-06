(function() {
  'use strict';

  angular
    .module('tally')
    .service('UserSerivce', UserSerivce);

  function UserSerivce(firebaseService) {

    this.createUserEntry = createUserEntry;

    function createUserEntry(user) {
      var userDb = {
        uid: user.uid,
        email: user.email
      };

      firebaseService.getUserRef().child('/' + userDb.uid).set(userDb);
    }

  }


})();
