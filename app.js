const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// 路由設定
const indexRouter = require('./routes/index');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');


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
