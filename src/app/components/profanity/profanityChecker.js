// (function() {
//   'use strict';
//
//   angular
//     .module('tally')
//     .service('ProfanityChecker', profanityChecker);
//
//   function profanityChecker($firebaseArray, firebaseService) {
//     var self = this;
//
//     self.checkText = function(text) {
//       var bannedWords = $firebaseArray(firebaseService.getProfanityRef());
//       var tokens = text.toString().split();
//       console.log(tokens);
//
//       bannedWords.$loaded().then(function(child) {
//         return crossCheck(tokens, bannedWords);
//       });
//     }
//
//     function crossCheck(tokens, bannedWords) {
//       var words = [];
//       for(var i=0; i<tokens.length; i++) {
//         for(var x=0; x<bannedWords.length; x++) {
//           console.log(tokens[i]);
//           if(tokens[i].toUpperCase() === bannedWords[i].toString().toUpperCase()) {
//             console.log(tokens[i]);
//             tokens[i] = tokens[i].replace(tokens[i].substring(1, tokens[i].length), "*");
//           }
//           break;
//         }
//       }
//       return tokens;
//     }
//   }
//
//   function getBannedWords() {
//     return ["anal",
//       "ass",
//       "asshat",
//       "asshole",
//       "balls",
//       "bastard",
//       "bitch",
//       "bitchy",
//       "bollocks",
//       "bullshit",
//       "cock",
//       "crap",
//       "crappy",
//       "cunt",
//       "cuntpunter",
//       "damn",
//       "darn",
//       "dick",
//       "dickbag",
//       "dickhead",
//       "dickish",
//       "dildo",
//       "dipshit",
//       "dongle",
//       "douche",
//       "douchebag",
//       "dumbass",
//       "dumbfuck",
//       "fanny",
//       "frak",
//       "fuck",
//       "fucker",
//       "fucking",
//       "fuckwad",
//       "goddamn",
//       "hellish",
//       "horseshit",
//       "jackass",
//       "motherfucker",
//       "motherfucking",
//       "nsa-hugging",
//       "piss",
//       "pissant",
//       "poppycock",
//       "prick",
//       "pussy",
//       "santorum",
//       "schmuck",
//       "shit",
//       "shitfaced",
//       "shitstain",
//       "shitstorm",
//       "shitter",
//       "shitty",
//       "skank",
//       "slut",
//       "tit",
//       "turd",
//       "twat",
//       "voldemort",
//       "wanker",
//       "whore",
//       "whoring"];
//   }
//
// }());
