
const { check } = require('express-validator/check');

var exp = module.exports = {};

exp.uservalidators=[
    check('name').not().isEmpty()
]

exp.movievalidators=[
    check('title').not().isEmpty(),
    check('description').not().isEmpty(),
    check('genre').not().isEmpty()
]

exp.userprofilevalidators=[
    check('name').not().isEmpty(),
    check('emailAddress').matches(/^([a-zA-Z0-9])(([\-.]|[_]+)?([a-zA-Z0-9]+))*(@){1}[a-z0-9]+[.]{1}(([a-z]{2,3})|([a-z]{2,3}[.]{1}[a-z]{2,3}))$/, "i"),
    check('password').isLength({min: 5})

]