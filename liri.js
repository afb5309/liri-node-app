require("dotenv").config();

var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var request = require('request');
var colors = require('colors');

var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var input = process.argv.slice(3).join("");
var cinema = process.argv.slice(3).join("+");

var action = process.argv[2];

switch (action) {

    case "concert":
        concert();
        break;
    case "spotify":
        spotifySong(input);
        break;
    case "movie":
        movie();
        break;
    case "do":
        getRandom();
        break;
};


function concert(){
    var bandURL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp"
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

    var queryUrl = "http://www.omdbapi.com/?t=" + cinema + "&y=&plot=short&apikey=trilogy";
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

function spotifySong(music){
spotify.search({ 
    type: 'track', 
    query: music }, 
    function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
  console.log("Artist".green)
  console.log(data.tracks.items[0].artists[0].name.magenta)
  console.log("Song".green)
  console.log(data.tracks.items[0].name.magenta)
  console.log("Album".green)
  console.log(data.tracks.items[0].album.name.magenta)
  console.log("Preview URL".green)
  console.log(data.tracks.items[0].external_urls.spotify.magenta);
  
});
}

function getRandom(){
    fs.readFile("./random.txt", "utf8", (error, data)=>{
        if (error) {
            console.log("error!")
        }
        var randomData = data.split(",");
        spotifySong(randomData[1])
            console.log(randomData)
    })
}