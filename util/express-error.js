class ExpressError extends Error {
    constructor(statusCode, message, src) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.src = src;
    }
}

module.exports = ExpressError;