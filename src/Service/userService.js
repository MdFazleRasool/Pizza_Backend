const { findUser, createUser } = require("../repositories/userRepository");

async function resgisterUser(userDetails) {

    // It will create a brand new user in the db    

    // 1. we need to check if the user with this email and mobile  number exists or not 
    const user = await findUser({
        email: userDetails.email,
        mobileNumber: userDetails.mobileNumber
    });
    if (user) {
        // we found an existing user
        throw { reason: 'user with the given email id  already exists', statusCode: 400 }
    }
    // if user not found then create a user

    // 2 . if not then create the user in the dataBase 

    const newUser = await createUser({
        email: userDetails.email,
        password: userDetails.password,
        firstName: userDetails.firstName,
        lastName: userDetails.lastName,
        mobileNumber: userDetails.mobileNumber
    })

    if (!newUser) {
        throw { reason: 'Something went wrong Cannot create user ', statusCode: 500 }
    }

    // 3. return the details of the created user 
    return newUser;

}

module.exports = {
    resgisterUser
}