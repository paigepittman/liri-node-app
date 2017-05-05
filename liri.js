var keys = require("./keys.js");
var twitterKeys = keys.twitterKeys;
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

function myTweets() {


};




function spotify() {

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





// function random() {


// };


