var MongoClient = require('mongodb').MongoClient;
require('../config/config')

var exp = module.exports = {};

exp.findAllUser = function (req, res, next) {
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) {
         next(err)
      }

      var db = client.db('movie');
      db.collection('users').find()
      .project({name: 1, emailAddress: 1, motto: 1, webPageUrl: 1, sex: 1})
      .toArray(function (err, result) {
         if (err) {
            console.log("Error during mongo query")
            next(err)
         }
         else {
            res.send(JSON.stringify(result))

         }
      })
   })
}

exp.createUser = function (user, res, next) {
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) { next(err);}

      var db = client.db('movie');
      db.collection('users').find({name: user.name})
      .project({name: 1, mailAddress: 1})
      .toArray(function (err, result) {
         if (err) {
            console.log("Error during mongo query")
            next(err)
         }
         else {
            if(result.length > 0){
               res.status(500).json({ error: 'User already exists' });
            }
            else{
               db.collection('users').insertOne(user, function(err, result){
                  if(err) next(err);
                  res.send(result);
               });
            }

         }
      })
   })
}