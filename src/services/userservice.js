var MongoClient = require('mongodb').MongoClient;
require('../config/config')

var exp = module.exports = {};

exp.findUser = function (username, pwd, res, next) {
   MongoClient.connect(process.env.mongo_url, { useNewUrlParser: true }, function (err, client) {
      if (err) {
         next(err)
      }

      var db = client.db('movie')

      /* db.collection('users').find({
          $and:[
             {name:req.query.name},
             {password:req.query.pwd}
          ]}*/
      // db.users.find({$where : function(){return this.name == 'Mézga Aladár';}})
      console.log("function () { return this.name == '"
         + username
         + "' && this.password == hex_md5('"
         + pwd
         + "'); }");
      db.collection('users').find({
         $where:
            "function () { return this.name == '"
            + username
            + "' && this.password == hex_md5('"
            + pwd
            + "'); }"
      }
         /*db.collection('users').find({
            $where:
               "function () { return this.name == 'Mézga Aladár';} // aa \n"
         }*/
      ).toArray(function (err, result) {
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
