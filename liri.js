require("dotenv").config();
var importedKeys = require("./key.js");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var inquirerInput = require("inquirer");

var spotify = new Spotify(importedKeys.spotify);
var client = new Twitter(importedKeys.twitter);

if (process.argv[2] === "my-tweets") {
    var params = {
        screen_name: 'Adaline83341989'
    };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (error) {
            console.log(error);
            return;
        }
        // console.log(tweets);
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
        }
    });
}

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
                query: inquirerResponse.songName
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