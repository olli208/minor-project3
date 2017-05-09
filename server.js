var express = require('express');
var app = express();
var path = require('path');
var io = require('socket.io');
var http = require('http');
var request = require('request');

// socket.io
http = http.createServer(app);
io = io(http);

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Set static files as CSS and JS
app.use(express.static('public'));

// route home page
app.get('/', function(req, res) {
	res.render('index');
});

var port = process.env.PORT || 5000;
http.listen(port, function (){
    console.log('server is running: on ' + port);
});