const AppError = require("./appError");

class UnAuthorisedError extends AppError{
    constructor(){
        super(`User is Not Authorised Properly`,401)

    }
}

module.exports=  UnAuthorisedError ;