(function() {
  'use strict';

  angular
    .module('tally')
    .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $locationProvider) {
    // Enable log
    $logProvider.debugEnabled(true);

    // Set options third-party lib
    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

    $locationProvider.html5Mode(true);

    // firebase config as found in firebase console
    var config = {
      apiKey: "AIzaSyBje9MigCvK4UpQnWbASWKyHb5F3EnLHpM",
      authDomain: "honours-project-bade2.firebaseapp.com",
      databaseURL: "https://honours-project-bade2.firebaseio.com",
      storageBucket: "honours-project-bade2.appspot.com",
      messagingSenderId: "184436827864"
    };

    firebase.initializeApp(config);
  }

})();
