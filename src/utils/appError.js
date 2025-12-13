// generic application error class 
// iske basis pe hum specific error classes bana sakte hain
// 
class AppError extends Error{
    constructor(message,statusCode) {
        super(message);
        this.statusCode=statusCode;
        Error.captureStackTrace(this,this.constructor);
    }
}

module.exports = AppError;