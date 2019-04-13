require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var colors = require('colors');

var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");

var action = process.argv[2];

switch (action) {

    case "concert-this":
        concert();
        break;
    case "spotify-this-song":
        spotifySong();
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        getRandom();
        break;
};

function concert(){
    var artist = ""
    for (var i = 3; i < process.argv.length; i++) {
      if (i > 3 && i < process.argv.length) {
        artist = artist + "+" + process.argv[i];
      }
      else {
        artist += process.argv[i];
      };
    };

    var bandURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    console.log(bandURL)
    axios.get(bandURL).then(
        function (response) {
            console.log("Artist".green)
            console.log(response.data[0].lineup[0].magenta)
            console.log("Venue Name".green)
            console.log(response.data[0].venue.name.magenta)
            console.log("Venue City".green)
            console.log(response.data[0].venue.city.magenta + " " + response.data[0].venue.region.magenta)
            console.log("Date".green)
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY").magenta)
            console.log("Time".green)
            console.log(moment(response.data[0].datetime).format("hh:mm A").magenta)
        });
};

function movie() {

    var queryUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    axios.get(queryUrl).then(
        function (response) {
            console.log("Movie Title".green)
            console.log(response.data.Title.magenta)
            console.log("Release Date".green)
            console.log(response.data.Year.magenta)
            console.log("IMDB Rating".green)
            console.log(response.data.Ratings[0].Value.magenta)
            console.log("Rotten Tomatoes Rating".green)
            console.log(response.data.Ratings[1].Value.magenta)
            console.log("Production Location".green)
            console.log(response.data.Country.magenta)
            console.log("Film Language".green)
            console.log(response.data.Language.magenta)
            console.log("Movie Plot".green)
            console.log(response.data.Plot.magenta)
            console.log("Main Actors".green)
            console.log(response.data.Actors.magenta)
        }
    );
};


// function song() {

//     var queryUrl = "http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy";
//     console.log(queryUrl);

//     axios.get(queryUrl).then(
//         function (response) {

//         });
//     };

