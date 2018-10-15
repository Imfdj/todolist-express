const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit : 10,
    port: 33066,
    host: '127.0.0.1',
    user: 'root',
    password: '123123',
    database: 'todolist',
    timezone:"08:00"
});
module.exports = pool;