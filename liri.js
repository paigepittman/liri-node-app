var command = process.argv[2];
var request = require("request");
var nodeArgs = process.argv;
var title = "";


for (var i = 3; i < nodeArgs.length; i++) {
	if (i > 3 && i < nodeArgs.length) {
		title = title + "+" + nodeArgs[i];
	}

	else {
		title += nodeArgs[i];
	}
}



function start() {

	switch (command) {

		case "my-tweets":
			myTweets();
			break;

		case "spotify-this-song":
			spotify();
			break;

		case "movie-this":
			movie();
			break;

		case "do-what-it-says":
			random();
			break;

	}
}

function myTweets() {

	var Twitter = require("twitter");
	var keys = require("./keys.js");
	var client = new Twitter(keys.twitterKeys);
	var params = {screen_name: "paigethecoder"};

	
	// var queryURL = "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=paigethecoder&count=2"
	client.get('statuses/user_timeline', params, function(error, tweets, response) {

		if (!error) {
		console.log(tweets[0].text);
		console.log(tweets[0].created_at);
		
	};


});

};


function spotify() {

	if(!title) title = "The Sign"; 

	 var queryURL = "https://api.spotify.com/v1/search?q=" + title + "&type=track";
	 request(queryURL, function(error, response, body) {

	 	var json = JSON.parse(body);

	 if (!error && response.statusCode === 200) {
	 	console.log("Artist: " + json.tracks.items[0].artists[0].name);
	 	console.log("Song Name: " + json.tracks.items[0].name);
	 	console.log("Preview Link: " + json.tracks.items[0].preview_url);
	 	console.log("Album: " + json.tracks.items[0].album.name);
 

		};
	});

};



function movie() {

	if(!title) title = "Mr. Nobody";
	var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&r=json"; 
	request(queryUrl, function(error, response, body) {

	var json = JSON.parse(body);

		if (!error && response.statusCode === 200) {
			console.log("Title: " + json.Title);
			console.log("Year Released: " + json.Year);
			console.log("Rating: " + json.Rated);
			console.log("Produced in: " + json.Country);
			console.log("Plot: " + json.Plot);
			console.log("Starring: " + json.Actors);
			console.log("Rotten Tomatoes: " + json.Ratings[1].Value);


		}
	});

};


function random() {
	var fs = require("fs");
	fs.readFile("random.txt", "utf8", function(error, data) {

		var dataRandom = data.split(",");
		command = dataRandom[0];
		title = dataRandom[1];
		start();

	});


};
start();










