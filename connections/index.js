const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require('express');
const router = express.Router();
dotenv.config({ path: './config.env' });

// const DB = process.env.DATABASE.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD
// );

// mongoose
//   .connect(DB)
//   .then(() => console.log('資料庫連接成功'));


router.get('/', async (req, res, next) => {
    res.status(200).json({
        status: 'success',
    });
});

module.exports = router;
