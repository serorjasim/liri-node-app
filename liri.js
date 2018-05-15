
require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var inquirer = require('inquirer');
var spotify = new Spotify(keys.spotify);
var request = require("request");
//to grab users commands from CLI
var selection = process.argv[2];
var search = process.argv[3];
//this package required twitter,spotify,request,inquirer

inquirer.prompt([
    {
        type: "list",
        name: "select",
        message: "What do you like to do",
        choices: ["my-tweets", "spotify-this-song", "movie-this", "do-what-it-says"]
    },
]).then(function (response) {
    console.log(response)
    if (response.select === "my-tweets") {
        inquirer.prompt([
            {
                type: "input",
                message: "What Tweets Do u want to Search?",
                name: "Tweet"
            }

        ]).then(function (inquirerResponse) {
            console.log(inquirerResponse.Tweet);
            var client = new Twitter({
                consumer_key: keys.twitterKeys.consumer_key,
                consumer_secret: keys.twitterKeys.consumer_secret,
                access_token_key: keys.twitterKeys.access_token_key,
                access_token_secret: keys.twitterKeys.access_token_secret
            });
            var params = { screen_name: inquirerResponse.Tweet };
            client.get("statuses/user_timeline", params, function (error, tweets, response) {
                if (error) {
                    console.log("hi")
                    console.log(error);
                }
                else {
                    console.log(tweets)
                }
            })
        });
    }
    else if (response.select === "spotify-this-song") {
        //inquirer just like previous one
        spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            // Do something with 'data'
        });
    } else if (response.select === "movie-this") {
        //use inquirer code


        //request package
    } else (response.select === "do-what-it-says")
    // Use user feedback for... whatever!!
});




