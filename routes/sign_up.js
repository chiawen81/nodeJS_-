const express = require('express');
const router = express.Router();
const appError = require('../service/appError');
const handleErrorAsync = require("../service/handleErrorAsync");
var validator = require('validator');
const User = require("../models/users");

router.post('/', handleErrorAsync(async (req, res, next) => {
    let { email, password, confirmPassword, name } = req.body;
    console.log('email', email);

    // 每日任務 Day26：加入驗證
    let emailValidator = validator.isEmail(email);
    let passwordValidator = validator.isStrongPassword(password, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 }) && (password === confirmPassword);
    let nameValidator = validator.isLength(name, { min: 2, max: undefined });

    console.log('passwordValidator ', passwordValidator);
    console.log('emailValidator', emailValidator);
    console.log('nameValidator', nameValidator);

    // 加密密碼
    //password = 
    // const newUser = await User.create({
    //     email,
    //     password,
    //     name
    // });

    if (passwordValidator && emailValidator && nameValidator) {
        res.status(200).json({
            status: 'success',
            valid: true
        });
    } else {
        res.status(200).json({
            status: 'success',
            valid: false
        });
    };

}));

module.exports = router;
