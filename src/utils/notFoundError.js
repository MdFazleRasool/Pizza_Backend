const AppError = require("./appError");

class NotFounderror extends AppError{
    constructor(properties){
        // Properties: [] -> Array aayega
        let notFoundProperties = "";
        properties.forEach(property => notFoundProperties += `${property} , `);
        super(`Not Able To Find properties: ${notFoundProperties} for the resours`)
    }
}