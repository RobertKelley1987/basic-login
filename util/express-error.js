class ExpressError extends Error {
    constructor(statusCode, message, type, src) {
        super();
        this.type = type;
        this.statusCode = statusCode;
        this.message = message;
        this.src = src;
    }
}

module.exports = ExpressError;