var pool = require('../database/db');
var tools = require('../tools/index');
var dayjs = require('dayjs')

const add = function (req, res) {
    if (tools.checkLogin(req)) {
        let values = [req.body.title, req.body.describe, req.body.priority, req.body.date, req.body.user_id, req.body.category_id];
        pool.getConnection((err, connection) => {
            if (err) {
                return err;
            }
            connection.query('INSERT into list VALUES(null, ?, ?, ?, ?, 0, 0, ?, ?)', values, function (error, results, fields) {
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
    } else {
        res.json({
            code: 401,
            msg: '未登录，不可调用',
            data: []
        })
    }
}
const update = function (req, res) {
    if (tools.checkLogin(req)) {
        let values = [req.body.title, req.body.describe, req.body.priority, req.body.date, req.body.state, req.body.is_deleted, req.body.user_id, req.body.category_id, req.body.id];
        pool.getConnection((err, connection) => {
            if (err) {
                return err;
            }
            connection.query("UPDATE list set title = ?, `describe` = ?, priority = ?, date = ?, state = ?, is_deleted = ?, user_id = ?, category_id = ? where id = ?;",
                values, function (error, results, fields) {
                    connection.release();
                    tools.resultsHandle(error, res, results);
                });
        });
    } else {
        res.json({
            code: 401,
            msg: '未登录，不可调用',
            data: []
        })
    }
}
const del = function (req, res) {
    if (tools.checkLogin(req)) {
        let values = [1, req.body.id];
        pool.getConnection((err, connection) => {
            if (err) {
                return err;
            }
            connection.query("UPDATE list set is_deleted = ? where id = ?;",
                values, function (error, results, fields) {
                    connection.release();
                    tools.resultsHandle(error, res, results);
                });
        });
    } else {
        res.json({
            code: 401,
            msg: '未登录，不可调用',
            data: []
        })
    }
}
const get_by_date = function (req, res) {
    if (tools.checkLogin(req)) {
        let values = [req.query.user_id, req.query.type, req.query.date];
        let sql = '';
        pool.getConnection((err, connection) => {
            if (err) {
                return err;
            }
            switch (parseInt(req.query.type)) {
                case 0:
                    sql = "select * from list where user_id = ?";
                    values = [req.query.user_id];
                    break;
                case 1:
                    sql = "select * from list  where user_id = ? and date = Date(NOW())";
                    values = [req.query.user_id];
                    break;
                case 2:
                    let day = dayjs().subtract(7, 'day').format('YYYY-MM-DD');
                    sql = "select * from list where user_id = ? and date between '"+ day +"' and Date(NOW())";
                    values = [req.query.user_id];
                    break;
                case 3:
                    sql = "select * from list where user_id = ? and date = ?";
                    values = [req.query.user_id, req.query.date];
                    break;
                case 4:
                    sql = "select * from list where user_id = ? and is_deleted = 1 ";
                    values = [req.query.user_id];
                    break;
                case 5:
                    sql = "select * from list where user_id = ? and state = 1";
                    values = [req.query.user_id];
                    break;
            }
            if(parseInt(req.query.type) != 4) {
                sql += " and is_deleted != 1 ";
            }
            switch (parseInt(req.query.sort_type)) {
                case 1:
                    sql += "ORDER BY date desc";
                    break;
                case 2:
                    sql += "ORDER BY priority desc, date desc";
                    break;
            }
            console.log(sql);
            connection.query(sql, values, function (error, results, fields) {
                connection.release();
                console.log(results);
                tools.resultsHandle(error, res, results);
            })
        });
    } else {
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
    get_by_date,
}