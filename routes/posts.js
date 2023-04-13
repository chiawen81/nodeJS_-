const express = require('express');
const router = express.Router();

// Day21 每日任務：非同步錯誤
router.get('/', async (req, res, next) => {
  // KK();// => 會觸發【非同步錯誤】unhandledRejection，未定義變數 kk()

  res.status(200).json({
    status: 'success',
  });
});


router.get('/test', async (req, res, next) => {
  res.status(200).json({
    status: 'success',
  });
});

module.exports = router;
