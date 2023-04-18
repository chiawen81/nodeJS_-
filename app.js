const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
};
dotenv.config({ path: './config.env' });
// 路由設定
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const posts2Router = require('./routes/posts2');
const signUpRouter = require("./routes/sign_up");

// 資料庫設定開始
dotenv.config({ path: './config.env' });
mongoose.connect(process.env.DATABASE)
    .then(res => console.log("連線資料成功123"));

// 同步錯誤
process.on('uncaughtException', err => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error('【同步錯誤】Uncaughted Exception！')
    console.error(err);
    process.exit(1);
});

// middlewire設定
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts2', posts2Router);
app.use('/sign_up', signUpRouter);


app.use(function (req, res, next) {
    console.log('大家都進來了~');
    console.log('process.env', process.env);
    next();
});

// 自己設定的 err 錯誤 
const resErrorProd = (err, res) => {
    console.log('resErrorProd');
    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        // log 紀錄
        console.error('出現重大錯誤', err);

        // 送出罐頭預設訊息
        res.status(500).json({
            status: 'error',
            message: '系統錯誤，請恰系統管理員'
        });
    }
};

// 開發環境錯誤
const resErrorDev = (err, res, req) => {
    console.log('resErrorDev');
    let error = {
        statusCode: err.statusCode,
        status: err.statusCode,
        body: req.body,
        message: err.message,
        stack: err.stack,
        detailInfo: err,
        // note: 以下訊息不一定有值
        // type: err.errors.type.message
        // expose: err.expose,      
    };
    res.writeHead(err.statusCode || 500, headers);
    res.write(JSON.stringify({
        status: err.status,
        message: err.message,
        error: error,
        stack: err.stack
    }));
    res.end();
};

// error handler （自訂錯誤訊息統一處理）
app.use(function (err, req, res, next) {
    console.log('error handler');
    // dev
    err.statusCode = err.statusCode || 500;
    if (process.env.NODE_ENV === 'dev') {
        return resErrorDev(err, res, req);
    }
    // production
    if (err.name === 'ValidationError') {
        err.message = "資料欄位未填寫正確，請重新輸入！"
        err.isOperational = true;
        return resErrorProd(err, res)
    }
    resErrorProd(err, res)
});

// 非同步錯誤
process.on('unhandledRejection', (reason, promise) => {
    console.error('【非同步錯誤】未捕捉到的 rejection：', promise, '原因：', reason);
});



module.exports = app;
