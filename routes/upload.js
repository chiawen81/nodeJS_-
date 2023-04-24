// 第七週正課：firebase
const express = require('express');
const router = express.Router();
const firebaseAdmin = require('../connection/firebase');
const multer = require('multer');
const bucket = firebaseAdmin.storage().bucket();

const upload = multer({
    limits: {
        fileSize: 5 * 1024 * 1024,  // 5MB
    },
});


// upload.single('file'),

router.post('/image', upload.single('file'), function (req, res) {
    console.log(111);
    // console.log('bucketName:', bucketName);
    console.log('bucket:', bucket);
    // 取得上傳的檔案資訊
    const file = req.file;
    // 基於檔案的原始名稱建立一個 blob 物件
    const blob = bucket.file(file.originalname);
    // 建立一個可以寫入 blob 的物件
    const blobStream = blob.createWriteStream();
    console.log(file);

    // 監聽上傳狀態，當上傳完成時，會觸發 finish 事件
    blobStream.on('finish', () => {
        res.send('上傳成功');
    });

    // 如果上傳過程中發生錯誤，會觸發 error 事件
    blobStream.on('error', (err) => {
        console.error(err);
        res.status(500).send(`上傳失敗：${err.message}`);
    });

    // 將檔案的 buffer 寫入 blobStream
    blobStream.end(file.buffer);
});


module.exports = router;
