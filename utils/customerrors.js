const statusCode = require('http-status-codes');

class notFoundError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = statusCode.NOT_FOUND;
        this.name = 'NotFoundError';
    }
}
class  badReqError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = statusCode.BAD_REQUEST;
        this.name = 'BadRequest';
    }
}
class unauthorizedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = statusCode.FORBIDDEN;
        this.name = 'unauthorized';
    }
}
class unauthenticatedError extends Error {
    constructor(message) {
        super(message);
        this.statusCode = statusCode.UNAUTHORIZED;
        this.name = 'unauthenticated';
    }
}

module.exports = { notFoundError, badReqError, unauthorizedError, unauthenticatedError };