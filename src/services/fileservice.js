require('../config/config');
const multer = require('multer');

var exp = module.exports = {};

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, process.env.app_folder)
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname)
        //callback(null, file.originalname)
    }
})

exp.writeFile = function (req, res, next) {
    var upload = multer({
        storage: storage
    }).single('file');
    upload(req, res, function (err) {
        console.log("File uploaded");
        res.end('File is uploaded')
    })

}



exp.readFile = function (req, response, next) {
    var filePath = process.env.app_folder + req.query.fileName;
    response.download(filePath);
}
