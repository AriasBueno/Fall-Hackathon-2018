/* app.js */

//require modules
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedString = bodyParser.urlencoded({extended: true});
const fs = require('fs');
// Imports the Google Cloud client library
const textToSpeech = require('@google-cloud/text-to-speech');
// Creates a client
const client = new textToSpeech.TextToSpeechClient();
// The text to synthesize
const text = 'The balance in your checking account is 523.85 dollars, savings 1100.             Your last transaction was Starbucks 5 dollars, Amazon 25 Dollars stop and shop 70 dollars';

const text3 = 'One moment please';

const text4 = 'Succefully complete';
// Construct the request

const request = {
  input: {text: text},
  // Select the language and SSML Voice Gender (optional)
  voice: {languageCode: 'en-US', ssmlGender: 'NEUTRAL'},
  // Select the type of audio encoding
  audioConfig: {audioEncoding: 'MP3'},
};

// var path = require('path');
var app = express();

//configure app
app.set('view engine', 'ejs');


//use middleware
app.use(express.static(__dirname + '/public'));//this displays the style.css and normalize.css file
// app.use(express.static(__dirname + '/views'));
// app.use(express.static(__dirname + '/profile'));
// app.use(bodyParser());
////////////

// Performs the Text-to-Speech request
client.synthesizeSpeech(request, (err, response) => {
  if (err) {
    console.error('ERROR:', err);
    return;
  }

  // Write the binary audio content to a local file
  fs.writeFile('output.mp3', response.audioContent, 'binary', err => {
    if (err) {
      console.error('ERROR:', err);
      return;
    }
    console.log('Audio content written to file: output.mp3');
  });
});

//////////

//define routes
app.get('/', function(req, res){
	res.render('home');
	console.log('inside home page!');


});

app.get('/home', function(req, res){
	res.render('home');

	console.log('inside home page!');
});

app.get('/donation', function(req, res){
	console.log('inside donation page!');
	res.render('donations');

});

//displaying on web app
app.listen(8000, function(){
	console.log('ready on port 8000');
});
