require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var colors = require('colors');

// var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment =require("moment");

var action = process.argv[2];

switch (action) {

    // default:                            
    //     logIt("Not a Command");
    //     break;
    case "concert-this":
        concert();
        break;
    // case "spotify-this-song":
    //     song();
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        command();
        break;
        
};

function concert(){
    var nodeArgs = process.argv;
    
    var artist = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {
    
      if (i > 3 && i < nodeArgs.length) {
        artist = artist + "+" + nodeArgs[i];
      }
      else {
        artist += nodeArgs[i];
      }
    }
    var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(bandURL)
    axios.get(bandURL).then(
        function (response) {
            console.log("Venue Name".green)
            console.log(response.data[0].venue.name.magenta)
            console.log("Venue City".green)
            console.log(response.data[0].venue.city.magenta)
            console.log("Time".green)
            console.log(response.data[0].datetime.magenta)
            
        }
    )

}


// function concert(){
//     if (action === "concert-this")
//     {
    
//     }
//     else{
//     }
// }

