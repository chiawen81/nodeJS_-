const express = require('express');
const router = express.Router();
const handleErrorAsync = require("../service/handleErrorAsync");
const appError = require('../service/appError');
const sendBackJWT = require("../service/auth");
var validator = require('validator');
var bcrypt = require('bcryptjs');
const User = require("../models/users");

// Day28 每日任務：登入
router.post('/', handleErrorAsync(async (req, res, next) => {
    let { password, confirmPassword, name } = req.body;
    let passwordValidator = validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }) && (password === confirmPassword);
    let nameValidator = validator.isLength(name, { min: 2, max: undefined });

    if (passwordValidator && nameValidator) {
        // 驗證密碼
        const user = await User.findOne({ name }).select('+password');
        const result = await bcrypt.compare(password, user.password);

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
