// Day22 每日任務：自訂錯誤訊息  (2)
const appError = (httpStatus, errMessage, next) => {
    const error = new Error(errMessage);
    error.statusCode = httpStatus;
    error.isOperational = true;
    next(error);
}

module.exports = appError;