var crypto = require('crypto');

const resultsHandle = function (error, res, results) {
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
            data: []
        })
    }else if(results.affectedRows != undefined && results.affectedRows == 0) {
        res.json({
            code: 1,
            msg: '失败',
            data: []
        })
    }else {
        res.json({
            code: 0,
            msg: '',
            data: results
        })
    }

}

const getRandomSalt = function (){
    return Math.random().toString().slice(2, 5);
}

const cryptPwd = function (password, salt) {
    // 密码“加盐”
    var saltPassword = password + ':' + salt;

    // 加盐密码的md5值
    var md5 = crypto.createHash('md5');
    return md5.update(saltPassword).digest('hex');
}
const checkLogin = function (req) {
    if(req.session.todolist_login) {
        return true;
    }else {
        return false;
    }
}

module.exports = {
    resultsHandle,
    getRandomSalt,
    cryptPwd,
    checkLogin,
}