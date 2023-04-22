const express = require('express');
const router = express.Router();
const { isAuth } = require("../service/auth");
const handleErrorAsync = require("../service/handleErrorAsync");



router.post('/test', isAuth, handleErrorAsync(async (req, res, next) => {
  res.send('respond with a resource');
}));


router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
