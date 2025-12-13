const AppError = require("./appError");

class InterServerError extends AppError{
    constructor(properties,resource){
        super(`It's not you it's our server where something went wrong`,500)
    }
}

module.exports=  InterServerError ;