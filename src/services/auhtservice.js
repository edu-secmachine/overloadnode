var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var MongoClient = require('mongodb').MongoClient;
require('../config/config');

var exp = module.exports = {};

passport.use(new LocalStrategy(
    function (username, password, done) {
        return authuser(username, password, done);
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

exp.isAuthenticated = function(req, res, next){
    if(req.user){
        next();
    }
    else{
        console.log('User is unauthenticated. Http 401 will be sent.')
        res.sendStatus(401);
    }
}

authuser = function (username, pwd, done) {
    MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
        if (err) {
            return done(err);
        }
        var db = client.db('movie')
        db.collection('users').find({
            $where:
                "function () { return this.name == '"
                + username
                + "' && this.password == hex_md5('"
                + pwd
                + "'); }"
            },
            
        )
        .project({
            name: 1,
            mailAddress: 1
        })
        .toArray(function (err, result) {
            if (err) {
                console.log("Error during mongo query");
                return done(err);
            }
            else {
                console.log("authentication successfull");
                console.log(result[0]);
                return done(null, result[0]);

            }
        })
    })
}