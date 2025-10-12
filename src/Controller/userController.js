import {resgisterUser} from '../Service/userService'

async  function createUser(req,res) {
    try {
        const response = await resgisterUser(req.body) ;
        return res.json({
            message:'User Successfully Created ' ,
            success : true ,
            data : response ,
            error : {}
        });
    } catch (error) {
        return res.status(error.statusCode).json({
            message: error.reason ,
            success : false ,
            data : {} ,
            error : error
        });
    }
    
}

module.exports = {
    createUser
}