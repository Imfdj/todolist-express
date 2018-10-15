var express = require('express');
var app = express();

const Joi = require('joi')
require('joi-router')
var list = require('../controllers/c.list');
var router = express.Router();

/* get */
router.get('/bydate', {
        query: {
            user_id: Joi.number().required(),
            type: Joi.number().required(),
            date: Joi.date().iso(),
            sort_type: Joi.number().required()
        }
}, function(req, res, next) {
    list.get_by_date(req, res);
});

/* add */

router.post('/',{
    body: {
        title: Joi.string().required(),
        describe: Joi.string().empty(''),
        priority: Joi.number().required(),
        date: Joi.date().iso().required(),
        user_id: Joi.string().required(),
        category_id: Joi.string().required()
    }
}, function(req, res, next) {
    list.add( req, res);
});
router.put('/',{
    body: {
        title: Joi.string().required(),
        describe: Joi.string().empty(''),
        priority: Joi.number().required(),
        date: Joi.date().iso().required(),
        user_id: Joi.string().required(),
        category_id: Joi.string().required(),
        state: Joi.number().required(),
        is_deleted: Joi.number().required(),
        id: Joi.number().required()
    }
}, function(req, res, next) {
    list.update( req, res);
});
router.delete('/',{
    body: {
        id: Joi.number().required()
    }
}, function(req, res, next) {
    list.del( req, res);
});


module.exports = router;
