require("dotenv").config();
var importedKeys = require("./key.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirerInput = require("inquirer");
var movieRequest = require("request");
var omdbRequest = require("omdb");
var fs = require("fs");
var spotify = new Spotify(importedKeys.spotify);
var client = new Twitter(importedKeys.twitter);
var action = process.argv[2];

// `node liri.js my-tweets` - Twitter:
function twitterF() {
    var params = {
        screen_name: 'Adaline83341989'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
            return;
        }
        for (var i = 0; i < tweets.length; i++) {
            console.log(`tweet: ${tweets[i].text}`);
        }
    });
}

// `node liri.js spotify-this-song` - Spotify:
function spotifyF() {
    inquirerInput
        .prompt([{
            type: "input",
            message: "What is the name of the song you want to look up?",
            name: "songName"
        }])
        .then(function (inquirerResponse) {
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
        });
}

// `node liri.js movie-this` - OMDB:
function omdbF() {
    inquirerInput
        .prompt([{
            type: "input",
            message: "What is the name of the movie you want to look up?",
            name: "movieName"
        }])
        .then(function (inquirerResponse) {
            var movie = inquirerResponse.movieName;
            movieRequest("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=12a1a279", function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    console.log(`Title: ${JSON.parse(body).Title}`);
                    console.log(`Year released: ${JSON.parse(body).Year}`);
                    console.log(`Year released: ${JSON.parse(body).Year}`);
                    console.log(`The movie's IMDB rating is: ${JSON.parse(body).imdbRating}`);
                    console.log(`The movie's Rotten Tomatoes rating is: ${JSON.parse(body).Ratings[1].Value}`);
                    console.log(`Country where the movie was produced: ${JSON.parse(body).Country}`);
                    console.log(`Language of the movie: ${JSON.parse(body).Language}`);
                    console.log(`Plot of the movie: ${JSON.parse(body).Plot}`);
                    console.log(`Actors: ${JSON.parse(body).Actors}`);

                }
            });
        });
}


`node liri.js do-what-it-says` - fs:
    function fsF() {
        fs.readFile("random.txt", "utf8", function (error, data) {
            if (error) {
                return console.log(error);
            }
            var dataArr = data.split(",");
            console.log(dataArr);
            for (var i = 0; i < dataArr.length; i++) {
                action = dataArr[0];

            }
        })
    }




switch (action) {
    case "my-tweets":
        twitterF();
        break;

    case "spotify-this-song":
        spotifyF();
        break;

    case "movie-this":
        omdbF();
        break;

    case "do-what-it-says":
        fsF();
        break;
};