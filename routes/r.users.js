var express = require('express');
const Joi = require('joi')
require('joi-router')
var users = require('../controllers/c.users');
var router = express.Router();

/* login */
router.post('/login', {
    body: {
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string()
    }
}, function(req, res, next) {
    users.login(req, res);
});
/* logOut */
router.get('/logout', function(req, res, next) {
    users.logOut(req, res);
});
/* register */
router.post('/', {
    body: {
        name: Joi.string().min(3).max(30).required(),
        password: Joi.string().min(6).max(20).required(),
        email: Joi.string().email().required()
    }
}, function(req, res, next) {
    users.register(req, res);
});


module.exports = router;
