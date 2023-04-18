const express = require('express');
const router = express.Router();
const handleErrorAsync = require("../service/handleErrorAsync");
const appError = require('../service/appError');
const sendBackJWT = require("../service/auth");
var validator = require('validator');
var bcrypt = require('bcryptjs');
const User = require("../models/users");

async function checkPassword(password, targetName) {
    const user = await User.findOne({ name: targetName }).select('+password');
    const result = bcrypt.compare(password, user.password);
    console.log('checkPassword', checkPassword);

    return result;
};

// 註冊
router.post('/', handleErrorAsync(async (req, res, next) => {
    let { password, confirmPassword, name } = req.body;
    let passwordValidator = validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }) && (password === confirmPassword);
    let nameValidator = validator.isLength(name, { min: 2, max: undefined });

    console.log('passwordValidator ', passwordValidator);
    console.log('nameValidator', nameValidator);

    if (passwordValidator && nameValidator) {
        // const user = await User.findOne({ name }).select('+password');

        // 驗證密碼
        // let result = await checkPassword(password, name);
        const user = await User.findOne({ name }).select('+password');
        console.log('password', password, 'ser.password', user.password);
        const result = await bcrypt.compare(password, user.password);
        console.log('result ', result);

        if (result) {
            console.log('身份證確');
            sendBackJWT(req.body, res, 200);
        } else {
            return next(appError(200, "欄位驗證錯誤！", next));
        };

    } else {
        console.log(2)
        return next(appError(200, "欄位驗證錯誤！", next));
    };
}));



module.exports = router;
