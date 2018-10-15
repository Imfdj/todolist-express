var express = require('express');
var app = express();

const Joi = require('joi')
require('joi-router')
var category = require('../controllers/c.category');
var router = express.Router();
/* get */
router.get('/', {
    query: {
        user_id: Joi.number().required()
    }
}, function(req, res, next) {
    category.get(req, res);
});

/* add */
router.post('/',{
    body: {
        name: Joi.string().required(),
        user_id: Joi.string().required()
    }
}, function(req, res, next) {
    category.add( req, res);
});
router.put('/',{
    body: {
        name: Joi.string().required(),
        id: Joi.number().required()
    }
}, function(req, res, next) {
    category.update( req, res);
});
router.delete('/',{
    body: {
        id: Joi.number().required()
    }
}, function(req, res, next) {
    category.del( req, res);
});


module.exports = router;
