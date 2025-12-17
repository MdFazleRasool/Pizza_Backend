
const { resgisterUser } = require('../Service/userService.js');

async  function createUser(req,res) {
    console.log('HEADERS:', req.headers['content-type']);
    console.log('BODY:', req.body);

    if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
        message: 'Request body is missing',
        success: false,
        data: {},
        error: {}
    });
}

    try {
        const response = await resgisterUser(req.body) ;
        return res.json({
            message:'User Successfully Created ' ,
            success : true ,
            data : response ,
            error : {}
        });
    } catch (error) {
        return res.status(error.statusCode || 500).json({
            message: error.message || 'something went wrong' ,
            success : false ,
            data : {} ,
            error : error
        });
    }
    
}

module.exports = {
    createUser
}