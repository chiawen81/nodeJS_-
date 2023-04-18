const jwt = require('jsonwebtoken');

// 產生身份驗證 JWT token
const sendBackJWT = (reqData, res, statusCode) => {
    // 產生 JWT token
    const token = jwt.sign({ id: reqData._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_DAY
    });

    // 回傳JWT
    res.status(statusCode).json({
        status: 'success',
        statusCode,
        user: {
            token,
            name: reqData.name
        }
    });
}



module.exports = sendBackJWT;