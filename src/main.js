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



app.post('/login',
   passport.authenticate('local'),
   function (req, res) {
      console.log('Got a POST request to /login')
      res.send(JSON.stringify(req.user));
   });


app.put('/rest/user', function (req, res, next) {
   userservice.createUser(req.body, res, next);
});

app.get('/rest/user', authservice.isAuthenticated, function (req, res, next) {
   res.send('get alll users: TODO!!!')
});

app.post('/rest/user', authservice.isAuthenticated, function (req, res, next) {
   res.send('modify user: TODO!!!')
});

app.get('/rest/user/changepwd', authservice.isAuthenticated, function (req, res, next) {
   res.send('changepwd: TODO!!!')
});

app.post('/rest/movie', authservice.isAuthenticated, function (req, res, next) {
   res.send('create movie : TODO!!!')
});

app.get('/rest/movie', authservice.isAuthenticated, function (req, res, next) {
   res.send('finind movies by title, description, genre, id (none is monadatory) : TODO!!!')
});

app.post('/uploadFile', authservice.isAuthenticated, function(req, res, next){
   res.send('file upload: TODO!!!')
});

app.get('/downloadFile', authservice.isAuthenticated, function (req, res, next) {
   res.send('file download TODO!!! (file should be specified with the fileName param')
});



var server = app.listen(8081, '127.0.0.1', function () {
   var host = server.address().address;
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})

