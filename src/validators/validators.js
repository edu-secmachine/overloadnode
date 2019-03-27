
const { check } = require('express-validator/check');

var exp = module.exports = {};

exp.uservalidators=[
    check('name').not().isEmpty()
]

exp.movievalidators=[
    check('title').matches(/^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/, "i"),
    //check('title').matches(/([a-zA-Z0-9,-\.'" :]+)*/, "i"),
    check('description').not().isEmpty(),
    check('genre').not().isEmpty()
]