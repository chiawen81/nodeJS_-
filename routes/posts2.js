const express = require('express');
const router = express.Router();
const appError = require('../service/appError');
const handleErrorAsync = require("../service/handleErrorAsync");
const Post = require("../models/posts");

// Day24 每日任務 (2)
const getPosts = async function (req, res, next) {
    console.log(1)
    if (req.body.content == undefined) {
        console.log(2)
        return next(appError(400, "你沒有填寫 content 資料", next))
    }
    console.log(3)
    const newPost = await Post.create(req.body);
    res.status(200).json({
        status: "success",
        post: newPost
    })
    res.end();
}

// Day24 每日任務 (3)
router.post('/', handleErrorAsync(getPosts));



router.get('/', async (req, res, next) => {
    console.log("find router posts2")
    try {
        const data = req.body;
        console.log('data', data);
        if (!data.content) {
            console.log('!data.content');
            // 將以下改為 appError 自訂錯誤回饋
            return next(appError(400, "你沒有填寫 content 資料", next))
        };
        const newPost = await Post.create(
            {
                user: data.user,
                content: data.content,
                tags: data.tags,
                type: data.type
            }
        );
        res.status(200).json({
            status: 'success',
            data: newPost
        });
    } catch (error) {
        console.log('catch error', error);
        next(error);
    };
});

module.exports = router;