const express = require('express');
const router = express.Router();
const appError = require('../service/appError');

// Day22 每日任務：自訂錯誤訊息  (3)
router.post('/', async (req, res, next) => {
    console.log("find router posts2")
    try {
        const data = req.body;
        console.log('data', data);
        if (!data.content) {
            console.log('!data.content');
            // 將以下改為 appError 自訂錯誤回饋
            appError(400, 'content 欄位為必填', next);
            return;
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