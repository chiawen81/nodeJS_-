const jwt = require('jsonwebtoken');
const handleErrorAsync = require("../service/handleErrorAsync");
const appError = require('../service/appError');
const User = require("../models/users");


// 產生身份驗證 JWT token
const sendBackJWT = (reqData, res, statusCode) => {
    console.log(reqData._id)
    // 產生 JWT token
    const token = jwt.sign({ id: reqData._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    });

    // 回傳JWT
    res.status(statusCode).json({
        status: 'success',
        statusCode,
        user: {
            token,
            name: reqData.name
        }
    });
}

// Day29 每日任務：JWT驗證 
const isAuth = handleErrorAsync(async (req, res, next) => {
    // 取得Client端的JWT token   
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        console.log('token', token);
    } else {
        return next(appError(401, "請重新登入！", next));
    };

    // 驗證 token 正確性
    const decodedClientData = await new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                reject(err)
            } else {
                console.log('payload', payload);
                resolve(payload);
            };
        })
    });
    console.log('decodedClientData', decodedClientData);

    // 抓出資料庫中的使用者資料
    const currentUser = await User.findOne({ id: decodedClientData.id });
    console.log('currentUser', currentUser);
    req.user = currentUser;
    next();
});



module.exports = { sendBackJWT, isAuth };