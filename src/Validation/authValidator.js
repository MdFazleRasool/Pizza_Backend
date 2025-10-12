const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

async function isLoggedIn(req,res,next){
    const token = req.cookies["authToken"];
    if(!token){
        res.status(401).json({
            success:false,
            data:{},
            error:"Not Authenticated",
            message:"No Auth Token provided"
        });
    }

    const decoded = jwt.verify(token,JWT_SECRET);
    if(!decoded){
        res.status(401).json({
            success:false,
            data:{},
            error:"Not Authenticated",
            message:"Ivalid Token Provided"
        });
    }
    /* 
        If Reached Here Then USer is Authenticated , 
        Allow Them to Access the API
    */
    req.user={
        email:decoded.email,
        id:decoded.id

    }
    console.log("Is Logged In Called - A MiddleWare");
    
    next();
}

module.exports={
    isLoggedIn
}

// client -->  middleware --> Controller

