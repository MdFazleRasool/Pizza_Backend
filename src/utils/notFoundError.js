const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor(properties,resource){
        // Properties: [] -> Array of properties aayega
        let notFoundProperties = "";
        properties.forEach(property => notFoundProperties += `${property} , `);
        super(`Not Able To Find properties: ${notFoundProperties} for the resourse ${resource}`)
    }
}

module.exports=  NotFoundError ;