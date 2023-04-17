const express = require('express');
const router = express.Router();
const appError = require('../service/appError');
const handleErrorAsync = require("../service/handleErrorAsync");
var validator = require('validator');
var bcrypt = require('bcryptjs');
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

    // 每日任務 Day25：加密密碼
    bcrypt.hash(password, 12).then(async val => {
        console.log(val);
        const newUser = await User.create({
            email,
            password: val,
            name
        });
        console.log('newUser', newUser);

        if (passwordValidator && emailValidator && nameValidator) {
            console.log(1)
            res.status(200).json({
                status: 'success',
                valid: true,
                // data: newUser
            });
        } else {
            console.log(2)
            res.status(200).json({
                status: 'success',
                valid: false,
                errorMsg: "請檢查您的資料是否正確"
            });
        };
    });
}));

module.exports = router;
