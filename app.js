const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();
const headers = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'PATCH, POST, GET,OPTIONS,DELETE',
    'Content-Type': 'application/json'
}

// 路由設定
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const posts2Router = require('./routes/posts2');

// middlewire設定
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// // Day21 每日任務：同步錯誤
// app.use(function (req, res, next) {
//     console.log('有人進來了');
//     kk();// => 會觸發【同步錯誤】uncaughtException，未定義變數 kk()
//     next();
// })

// 路由
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/posts2', posts2Router);

// Day22 每日任務：自訂錯誤訊息  (1)
// error handler
// 錯誤處理的 middleware 相較一般 middleware 會多一個 err 引數
app.use(function (err, req, res, next) {
    console.log('進到錯誤訊息統一處理');
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// 同步錯誤
process.on('uncaughtException', err => {
    // 記錄錯誤下來，等到服務都處理完後，停掉該 process
    console.error('【同步錯誤】Uncaughted Exception！')
    console.error(err);
    process.exit(1);
});

// 非同步錯誤
process.on('unhandledRejection', (reason, promise) => {
    console.error('【非同步錯誤】未捕捉到的 rejection：', promise, '原因：', reason);
});



module.exports = app;
