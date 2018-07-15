require("dotenv").config();
var importedKeys = require("./key.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");

var spotify = new Spotify(importedKeys.spotify);
var client = new Twitter(importedKeys.twitter);

if (process.argv[2] === "my-tweets") {
    var params = {
        screen_name: 'Adaline83341989'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if(error) {
            console.log(error);
            return;
        }
        // console.log(tweets);
        for (var i = 0; i < tweets.length; i++){
            console.log(tweets[i].text);
        }
    });
}

if (process.argv[2] === "spotify-this-song") {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       // Get the data you want for items[0]
       // Once you have all four create a for loop around the console.log
       // Replace the 0 in each console.log with an i
      console.log("Artist Name: " + data.tracks.items[0].artist.name); 
      });
}