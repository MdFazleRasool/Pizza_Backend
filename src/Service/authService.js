const { findUser } = require("../repositories/userRepository");
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken')
const {JWT_SECRET,JWT_EXPIRY} = require('../config/serverConfig')

async function loginUser(authDetails){
    const email = authDetails.email;
    const plainPassword = authDetails.password;

    // 1. check if there is a registered user with the given email i'd
    const user = await findUser({email});

    if (!user) {
        // we found an existing user
        throw { message: 'No user found with the given email', statusCode: 404 }
    }

    // 2. if the user is found we need to compare the plain password with the hashed password
    
    const isPasswordValidated = await bcrypt.compare(plainPassword,user.password);

    if(!isPasswordValidated){
        throw { message: 'Wrong Password , Try Again!', statusCode: 401 }
    }

    userRole = user.role ? user.role : "USER"

    // 3 . If the password is validated , create a token  and return it 

    const token = jwt.sign({email:user.email,id:user._id , role: userRole},JWT_SECRET ,{
        expiresIn:JWT_EXPIRY
    });

    return token ;
}

module.exports={
    loginUser
}