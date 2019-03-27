var MongoClient = require('mongodb').MongoClient;
require('../config/config')

var exp = module.exports = {};

exp.findMovies = function (req, res, next) {
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) { return next(err);}
      var filter = {};
      if(req.query.title) filter.title = req.query.title;
      if(req.query.id) filter._id = req.query.id;
      if(req.query.description) filter.description = req.query.description;
      if(req.query.genre) filter.genre = req.query.genre;
      var db = client.db('movie');
      db.collection('movies').find(filter)
      .toArray(function (err, result) {
         if (err) {
            console.log("Error during mongo query")
            return next(err);
         }
         else {
            result.map(movie => {movie.id = movie._id; movie._id = undefined; return movie;})
            res.send(JSON.stringify(result))
         }
      })
   })
}

exp.createMovie = function (movie, res, next) {
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) { return next(err);}
      var db = client.db('movie');
      db.collection('movies').insertOne(movie, function(err, result){
        if(err) {console.log(err);return next(err);}
        res.send(result);
     });
   })
}