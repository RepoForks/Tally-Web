(function() {
  'use strict'

  angular
    .module('tally')
    .service('profanityService', profanityService);

  function profanityService() {
    var _this = this;

    this.profanity = ["anal",
      "ass",
      "asshat",
      "asshole",
      "balls",
      "bastard",
      "bitch",
      "bitchy",
      "bollocks",
      "bullshit",
      "cock",
      "crap",
      "crappy",
      "cunt",
      "cuntpunter",
      "damn",
      "darn",
      "dick",
      "dickbag",
      "dickhead",
      "dickish",
      "dildo",
      "dipshit",
      "dongle",
      "douche",
      "douchebag",
      "dumbass",
      "dumbfuck",
      "fanny",
      "frak",
      "fuck",
      "fucker",
      "fucking",
      "fuckwad",
      "goddamn",
      "hellish",
      "horseshit",
      "jackass",
      "motherfucker",
      "motherfucking",
      "nsa-hugging",
      "piss",
      "pissant",
      "poppycock",
      "prick",
      "pussy",
      "santorum",
      "schmuck",
      "shit",
      "shitfaced",
      "shitstain",
      "shitstorm",
      "shitter",
      "shitty",
      "skank",
      "slut",
      "tit",
      "turd",
      "twat",
      "voldemort",
      "wanker",
      "whore",
      "whoring"];

    this.symbol = "*";

    this.check = function(text) {
      var regex = /([\s -!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])/g;
      var tokens = [];

      if(typeof text == 'string' || text instanceof String) {
        tokens = findProfanity(this, text.split(regex));
      }

      if(typeof text == 'object' || text instanceof Object) {
        var holder = [];
        for(var key in text) {
          tokens.push(findProfanity(this, text[key].split(regex)).join(""));
        }
      }

      console.log(tokens);
      return tokens;
    };

    function findProfanity(_this, tokens) {
      for(var i=0; i<tokens.length; i++) {
        for(var x=0; x<_this.profanity.length; x++) {
          if(tokens[i].toUpperCase() === _this.profanity[x].toUpperCase()) {
            tokens[i] = hideProfanity(_this, tokens[i]);
            break;
          }
        }
      }
      return tokens;
    }

    function hideProfanity(_this, string) {
      if(string.length > 1) {
        var firstletter = string.substring(0, 1);
        return string.replace(string, firstletter + _this.symbol.repeat(string.length - 1));
      }
      return string;
    };

  }

})();
