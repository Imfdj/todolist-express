var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')
const cors = require('cors');



var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/r.users');
var listRouter = require('./routes/r.list');
var categoryRouter = require('./routes/r.category');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        // domain: 'xxx.xxx.xxx.xxx:xxxx', // 域名
        // path: '路径'
        httpOnly: true, // 开启后前端无法通过 JS 操作
        maxAge: 30 * 60 * 1000 // 这一条 是控制 sessionID 的过期时间的！！！
    },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
}))
// enable CORS - Cross Origin Resource Sharing
app.use(cors());


app.use('/', indexRouter);
app.use('/v1/users', usersRouter);
app.use('/v1/list', listRouter);
app.use('/v1/category', categoryRouter);

module.exports = app;
