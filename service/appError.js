const appError = (httpStatus, errMessage, next) => {
    const error = new Error(errMessage);
    error.statusCode = httpStatus;
    error.isOperational = true;
    console.log('appError', httpStatus, errMessage);
    next(error);
}

module.exports = appError;