const AppError = require("./appError");

class NotFoundError extends AppError{
    constructor(resource){
        // Properties: [] -> Array of properties aayega
        // let notFoundProperties = "";
        // properties.forEach(property => notFoundProperties += `${property} , `);
        //super(`Not Able To Find properties: ${notFoundProperties} for the resourse ${resource}`)
        super(`Not Able To  find ${resource}`,404)

    }
}

module.exports=  NotFoundError ;