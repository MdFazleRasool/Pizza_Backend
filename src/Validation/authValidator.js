const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnAuthorisedError = require("../utils/unAuthorisedError");

async function isLoggedIn(req, res, next) {
    const token = req.cookies["authToken"];
    if (!token) {
        res.status(401).json({
            success: false,
            data: {},
            error: "Not Authenticated",
            message: "No Auth Token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        /* 
         *   If Reached Here Then USer is Authenticated , 
         *   Allow Them to Access the API
         */
        if (!decoded) {
            throw new UnAuthorisedError();
        }
        req.user = {
            email: decoded.email,
            id: decoded.id,
            role: decoded.role

        }
        console.log("Is Logged In Called - A MiddleWare");

        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            data: {},
            error: error,
            message: "Ivalid Token Provided"
        });
    }





}
/* 
  * this function checks if the authenticated user is an admin or not or not 
  * Bacuse we will call isAdmin after isLoggedIn thats why we will receive user details
*/
function isAdmin(req, res, next) {


    const loggedInUser = req.user;
    //console.log(loggedInUser);
    if (loggedInUser.role === "ADMIN") {
        console.log("User Is an admin");
        next();
    }
    else {
        return res.status(401).json({
            success: false,
            data: {},
            message: " you'r not authorised for this action",
            error: {
                statusCode: 404,
                reason: "Unauthorised user for this action"
            }
        })
    }
}

module.exports = {
    isLoggedIn,
    isAdmin
}

// client -->  middleware --> Controller

