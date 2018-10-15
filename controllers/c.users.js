var pool = require('../database/db');
var tools = require('../tools/index');

const login = function(req, res) {
    let email = req.body.email;
    pool.getConnection((err, connection) => {
        if (err) {return err;}
        connection.query('SELECT salt from user where email = ?', [email], function (error, results, fields) {
            connection.release();
            if(error) {
                res.json({
                    code: 1,
                    msg: error.sqlMessage,
                    data: []
                })
                return error;
            }else {
                if(results.length > 0) {
                    let password = tools.cryptPwd(req.body.password, results[0].salt);
                    let values = [req.body.email, password]
                    pool.getConnection((err, connection) => {
                        if (err) {return err;}
                        connection.query('SELECT * from user where email = ? and password = ?', values, function (error, results, fields) {
                            connection.release();
                            if(error) {
                                res.json({
                                    code: 1,
                                    msg: error.sqlMessage,
                                    data: []
                                })
                                return error;
                            }else {
                                if(results.length > 0) {
                                    req.session.todolist_login = true;
                                    let data = results[0];
                                    delete data.password;
                                    delete data.salt;
                                    res.json({
                                        code: 0,
                                        msg: '登录成功',
                                        data: data
                                    })
                                }else {
                                    res.json({
                                        code: 1,
                                        msg: '密码错误',
                                        data: []
                                    })
                                }
                            }
                        });
                    });
                }else {
                    res.json({
                        code: 1,
                        msg: '此邮箱还未注册',
                        data: []
                    })
                }
            }

        });
    });

}

const logOut = function(req, res) {
    req.session.destroy();
    res.json({
        code: 0,
        msg: '登出成功',
        data: []
    })
}
const register = function(req, res) {
    console.log(req.body);
    pool.getConnection((err, connection) => {
        if (err) {return err;}
        connection.query('SELECT * from user where email = ?', req.body.email, function (error, results, fields) {
            connection.release();
            if(error) {
                res.json({
                    code: 1,
                    msg: error.sqlMessage,
                    data: []
                })
                return error;
            }else {
                if(results.length > 0) {
                    res.json({
                        code: 0,
                        msg: '邮箱已注册',
                        data: []
                    })
                }else {
                    let salt = tools.getRandomSalt();
                    let password = tools.cryptPwd(req.body.password, salt);
                    let values = [req.body.name, password, salt, req.body.email];
                    pool.getConnection((err, connection) => {
                        if (err) {return err;}
                        connection.query('INSERT into user VALUES(null, ?, ?, ?, ?)', values, function (error, results2, fields) {
                            connection.release();
                            tools.resultsHandle(error, res, results2);
                        });
                    });
                }
            }
        });
    });

}

module.exports = {
    login,
    register,
    logOut,
}
