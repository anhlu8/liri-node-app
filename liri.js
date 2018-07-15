require("dotenv").config();
var importedKeys = require("./key.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirerInput = require("inquirer");
var movieRequest = require("request");
var fs = require("fs");
var spotify = new Spotify(importedKeys.spotify);
var client = new Twitter(importedKeys.twitter);

// `node liri.js my-tweets` - Twitter:
if (process.argv[2] === "my-tweets") {
    var params = {
        screen_name: 'Adaline83341989'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
            return;
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    });
}

// `node liri.js spotify-this-song '<song name here>'` - Spotify:
inquirerInput
    .prompt([{
        type: "input",
        message: "What is the name of the song you want to look up?",
        name: "songName"
    }])
    .then(function (inquirerResponse) {
        if (process.argv[2] === "spotify-this-song") {
            spotify.search({
                type: 'track',
                query: inquirerResponse.songName || "The Sign"
            }, function (err, data) {
                if (err) {
                    return console.log('Error occurred: ' + err);
                }
                for (var i = 0; i < data.tracks.items.length; i++) {
                    console.log("The artist(s) are: " + data.tracks.items[i].artists[0].name);
                    console.log("The song's name: " + data.tracks.items[i].name);
                    console.log("Preview link: " + data.tracks.items[i].preview_url);
                    console.log("Album: " + data.tracks.items[i].album.name);
                }
            });
        }
    })

// `node liri.js movie-this '<movie name here>'` - OMDB:
inquirerInput
    .prompt([{
        type: "input",
        message: "What is the name of the movie your want to look up?",
        name: "movieName"
    }])
    .then(function (inquirerResponse) {
        var movie = inquirerResponse.movieName;
        movieRequest("http://www.omdbapi.com/?t" + movie + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

            if (!error && response.statusCode === 200 && process.argv[2] === "movie-this") {
                console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
            }
        });
    })

//`node liri.js do-what-it-says`- fs:
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    fs.writeFile("movies.txt", "Inception, Die Hard", function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("movies.txt was updated!");
      });
  });

    