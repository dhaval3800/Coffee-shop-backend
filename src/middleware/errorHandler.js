const errorHandler = (err, req, res, next) => {
    console.log("🚀 ~ file: errorHandler.js:2 ~ errorHandler ~ err:", err)
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    if (err.error && err.error.isJoi) {
        statusCode = 400;
        message = err.error.details.map(detail => detail.message).join(', ');
    }
    else if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.message;
    } else if (err.name === 'CastError') {
        statusCode = 404;
        message = 'Resource not found';
    }
    else if (err.message === 'invalid credential') {
        statusCode = 401;
        message = 'Invalid credential';
    }

    res.status(err.status || statusCode).json({ error: message });
};

module.exports = errorHandler;
