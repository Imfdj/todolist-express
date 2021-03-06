var pool = require('../database/db');
var tools = require('../tools/index');

const add = function(req, res) {
    if(tools.checkLogin(req)) {
        let values = [req.body.name, req.body.user_id];
        pool.getConnection((err, connection) => {
            if (err) {return err;}
            connection.query('INSERT into category VALUES(null, ?, ?)', values, function (error, results, fields) {
                connection.release();
                // tools.resultsHandle(error, res, results);
                if (error) {
                    res.json({
                        code: 1,
                        msg: error.sqlMessage,
                        data: []
                    })
                    return error;
                }
                if(results.affectedRows != undefined && results.affectedRows != 0) {
                    res.json({
                        code: 0,
                        msg: '成功',
                        data: {
                            id: results.insertId
                        }
                    })
                }else if(results.affectedRows != undefined && results.affectedRows == 0) {
                    res.json({
                        code: 1,
                        msg: '失败',
                        data: []
                    })
                }
            });
        });
    }else {
        res.json({
            code: 401,
            msg: '未登录，不可调用',
            data: []
        })
    }
}
const update = function(req, res) {
    if(tools.checkLogin(req)) {
        let values = [req.body.name, req.body.id];
        pool.getConnection((err, connection) => {
            if (err) {return err;}
            connection.query("UPDATE category set name = ? where id = ?;",
                values, function (error, results, fields) {
                    connection.release();
                    tools.resultsHandle(error, res, results);
                });
        });
    }else {
        res.json({
            code: 401,
            msg: '未登录，不可调用',
            data: []
        })
    }
}
const del = function(req, res) {
    if(req.body.id == 1) {
        res.json({
            code: 1,
            msg: '失败，不可删除默认类别',
            data: []
        })
        return;
    }
    let values = [req.body.id];
    if(tools.checkLogin(req)) {
        pool.getConnection((err, connection) => {
            if (err) {return err;}
            connection.query("UPDATE list set category_id = 1 where category_id = ?;",
                values, function (error, results, fields) {
                    connection.release();

                    pool.getConnection((err, connection) => {
                        if (err) {return err;}
                        connection.query("delete from category where id = ?;",
                            values, function (error, results, fields) {
                                connection.release();
                                tools.resultsHandle(error, res, results);
                            });
                    });
                });
        });
    }else {
        res.json({
            code: 401,
            msg: '未登录，不可调用',
            data: []
        })
    }
}
const get = function(req, res) {
    if(tools.checkLogin(req)) {
        let values = [req.query.user_id];
        pool.getConnection((err, connection) => {
            if (err) {return err;}
            connection.query("select * from category  where user_id = ?;",
                values, function (error, results, fields) {
                    connection.release();
                    tools.resultsHandle(error, res, results);
                });
        });
    }else {
        res.json({
            code: 401,
            msg: '未登录，不可调用',
            data: []
        })
    }
}

module.exports = {
    add,
    update,
    del,
    get,
}