
const { check } = require('express-validator/check');

var exp = module.exports = {};

exp.uservalidators=[
    check('name').not().isEmpty()
]