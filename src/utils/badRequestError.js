const AppError = require("./appError");

class BadRequestError extends AppError{
    constructor(invalidParam){
        // invalidParam: [] -> Array of params aayega
        let message = "";
        invalidParam.forEach(params => invalidParam += `${params} \n `);
        super(`The request has the foloowing invalid parameters`,400)
    }
}

module.exports=  BadRequestError ;