require('../config/config');
const multer = require('multer');
const upload = multer({
  dest: process.env.app_folder
}); 

var exp = module.exports = {};

exp.writeFile = function (req, res, next) {
    upload.single('file')
   //var file = req.files[0];
   res.send('ok');
   
}



exp.readFile = function(fileName, response) {
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
