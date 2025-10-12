const UserRepository = require("../repositories/userRepository");
const UserService = require("../Service/userService");

async  function createUser(req,res) {
    console.log(" create user Controller Called ");
    console.log(req.body);
    //TODO :  Register the user
    
    const userService = new UserService(new UserRepository());
    console.log(userService);
    
    try {
        const response = await userService.resgisterUser(req.body) ;
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

// function getUser(){
//     console.log("Details of all the users are :- ");
// }

module.exports = {
    createUser
}