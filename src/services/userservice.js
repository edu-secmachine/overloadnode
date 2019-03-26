var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
require('../config/config')
var crypto = require('crypto');

var exp = module.exports = {};

exp.findAllUser = function (req, res, next) {
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) { return next(err) }

      var db = client.db('movie');
      db.collection('users').find()
         .project({ name: 1, emailAddress: 1, motto: 1, webPageUrl: 1, sex: 1 })
         .toArray(function (err, result) {
            if (err) {
               console.log("Error during mongo query")
               return next(err)
            }
            else {
               result.map(user => { user.id = user._id; user._id = undefined; return user; })
               res.send(JSON.stringify(result))

            }
         })
   })
}

exp.createUser = function (user, res, next) {
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) { return next(err); }

      var db = client.db('movie');
      db.collection('users').find({ name: user.name })
         .project({ name: 1, mailAddress: 1 })
         .toArray(function (err, result) {
            if (err) {
               console.log("Error during mongo query")
               return next(err)
            }
            else {
               if (result.length > 0) {
                  res.status(500).json({ error: 'User already exists' });
               }
               else {
                  user.password = crypto.createHash('md5').update(user.password).digest("hex");
                  db.collection('users').insertOne(user, function (err, result) {
                     if (err) return next(err);
                     res.send(result);
                  });
               }

            }
         })
   })
}

exp.changePassword = function (req, res, next) {
   var user = req.user;
   var newpwd = req.query.newpwd;
   user.password = crypto.createHash('md5').update(newpwd).digest("hex");
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) { return next(err) }

      var db = client.db('movie');
      db.collection('users').updateOne(
         {_id: ObjectID(user._id)}, 
         {$set:{password: user.password}}, 
         function (err, result) {
         if (err) return next(err);
         res.send(result);
      })
   })

}