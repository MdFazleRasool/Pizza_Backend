const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParam){
        // invalidParam: [] -> Array of params aayega
        const message = invalidParam
            .map((msg, index) => `${index + 1}. ${msg}`)
            .join("\n");

        super(`The request has the following invalid parameters:\n${message}`,
            400 );
    }
}

module.exports=  BadRequestError ;