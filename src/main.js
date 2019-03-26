var fs = require("fs");
var express = require('express');
var app = express();
require('./config/config');
var userservice = require("./services/userservice");
var passport = require('passport')
var authservice = require('./services/auhtservice');
var bodyParser = require('body-parser');

app.use(require('cookie-parser')());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(require('express-session')({
   secret: 'keyboard cat',
   resave: true,
   saveUninitialized: true
 }));
app.use(passport.initialize());
app.use(passport.session());

// This responds with "Hello World" on the homepage
app.get('/', function (req, res, next) {
   console.log("Got a GET request for the homepage");
   userservice.findUser(req.query.name, req.query.password, res, next);
})

// This responds a POST request for the homepage
app.post('/', function (req, res) {
   console.log("Got a POST request for the homepage");
   res.send('Hello POST');
})

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
     console.log('Got a POST request to /login')
    res.send(JSON.stringify(req.user));
  });

// This responds a DELETE request for the /del_user page.
app.delete('/del_user', function (req, res) {
   console.log("Got a DELETE request for /del_user");
   res.send('Hello DELETE');
})

// This responds a GET request for the /list_user page.
app.get('/list_user',authservice.isAuthenticated, function (req, res) {
   console.log("Got a GET request for /list_user");
   res.send('Page Listing');
})

// This responds a GET request for abcd, abxcd, ab123cd, and so on
app.get('/ab*cd', function (req, res) {
   console.log("Got a GET request for /ab*cd");
   res.send('Page Pattern Match');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

function readFile(fileName, response) {
   var filePath = process.env.app_folder + fileName;
   console.log('shall read file: ' + filePath);
   fs.readFile(filePath, function (err, data) {
      if (err) {
         return console.error(err);
      }
      console.log('file reading returned with content: ' + data.toString());
      response.end(data.toString());
   });
}
