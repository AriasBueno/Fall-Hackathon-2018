/* app.js */

//require modules
var express = require('express');
var bodyParser = require('body-parser');
var urlencodedString = bodyParser.urlencoded({extended: true});


// var path = require('path');
var app = express();

//configure app
app.set('view engine', 'ejs');


//use middleware
app.use(express.static(__dirname + '/public'));//this displays the style.css and normalize.css file
// app.use(express.static(__dirname + '/views'));
// app.use(express.static(__dirname + '/profile'));
// app.use(bodyParser());


//define routes
app.get('/', function(req, res){
	res.render('home');
	console.log('inside home page!');


});

app.get('/home', function(req, res){
	res.render('home');

	console.log('inside home page!');
});


//displaying on web app
app.listen(8000, function(){
	console.log('ready on port 8000');
});
