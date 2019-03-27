var fs = require("fs");
var express = require('express');
var app = express();
require('./config/config');
var passport = require('passport')
var bodyParser = require('body-parser');
const { validationResult } = require('express-validator/check');
var validators = require('./validators/validators');
var cors = require('cors');

var authservice = require('./services/auhtservice');
var userservice = require("./services/userservice");
var moviesevice = require('./services/movieservice');
var fileservice = require('./services/fileservice');



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

var whitelist = ['http://localhost:4200', 'http://example2.com']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  allowedHeaders: 'Content-Type,Origin,Refere,User-Agen',
  methods: '*'
}
app.use(cors(corsOptions))



app.post('/login',
   passport.authenticate('local'),
   function (req, res) {
      console.log('Got a POST request to /login')
      res.send(JSON.stringify(req.user));
   });

app.put('/rest/user', validators.uservalidators, function (req, res, next) {
   if(validate(req, res)){
      userservice.createUser(req.body, res, next);
   }
});

app.get('/rest/user', authservice.isAuthenticated, function (req, res, next) {
   userservice.findAllUser(req, res, next);
});

app.post('/rest/user', authservice.isAuthenticated, function (req, res, next) {
   res.send('modify user: TODO!!!')
});

app.get('/rest/user/changepwd', authservice.isAuthenticated, function (req, res, next) {
   userservice.changePassword(req, res, next);
});

app.post('/rest/movie', authservice.isAuthenticated, validators.movievalidators, function (req, res, next) {
   if(validate(req, res)){
      moviesevice.createMovie(req.body, res, next);
   }
});

app.get('/rest/movie', authservice.isAuthenticated, function (req, res, next) {
   moviesevice.findMovies(req, res, next);
});

app.post('/uploadFile', authservice.isAuthenticated, function (req, res, next) {
   fileservice.writeFile(req, res, next);
});

app.get('/downloadFile', authservice.isAuthenticated, function (req, res, next) {
   fileservice.readFile(req, res, next);
});

function validate(req, res) {
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      return false;
   }
   return true;
}

var server = app.listen(process.env.my_port, '127.0.0.1', function () {
   var host = server.address().address;
   var port = server.address().port

   console.log("Overloadnode app listening at http://%s:%s", host, port)
})

