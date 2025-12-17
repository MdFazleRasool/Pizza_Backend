const mongoose = require('mongoose')
const serConfig = require('./serverConfig')

/**
 * The below function helps us to connect to the mongoDB Server
 */

async function connectDB() {
    try {
        await mongoose.connect(serConfig.DB_URL);
        console.log("Successfully connected to the mongoDb Server");
        
    } catch (error) {
        console.log("Not Able to connect with the  mongoDB server");
        console.log(error);
    }
}

module.exports=connectDB;