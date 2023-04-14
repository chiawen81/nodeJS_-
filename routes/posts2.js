const express = require('express');
const router = express.Router();
const appError = require('../service/appError');
const handleErrorAsync = require("../service/handleErrorAsync");
const Post = require("../models/posts");
const User = require("../models/users");

// Day22 每日任務：自訂錯誤訊息  (3)
router.post('/', handleErrorAsync(async function (req, res, next) {
    if (req.body.content == undefined) {
        return next(appError(400, "你沒有填寫 content 資料", next))
    }
    const newPost = await Post.create(req.body);
    // res.send('<h1>1234</h1>');
    res.status(200).json({
        status: "success",
        post: newPost
    })
}));
router.get('/', async (req, res, next) => {
    console.log("find router posts2")
    try {
        next(appError(400, "就是要錯", next))
        // const data = req.body;
        // console.log('data', data);
        // if (!data.content) {
        //     console.log('!data.content');
        //     // 將以下改為 appError 自訂錯誤回饋
        //     return next(appError(400, "你沒有填寫 content 資料", next))
        //     // appError(400, 'content 欄位為必填', next);
        //     // return;
        // };
        // const newPost = await Post.create(
        //     {
        //         user: data.user,
        //         content: data.content,
        //         tags: data.tags,
        //         type: data.type
        //     }
        // );
        // res.status(200).json({
        //     status: 'success',
        //     data: newPost
        // });
    } catch (error) {
        console.log('catch error', error);
        next(error);
    };
});

module.exports = router;