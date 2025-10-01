const express = require('express');

const ServerConfig = require('./config/serverConfig')

const app = express();

app.listen(ServerConfig.PORT,() => {
    console.log(`Server Started At Port ${ServerConfig.PORT}`) ;
    console.log(process.env.windir);
    //console.log(process.env);
    console.log(process.env.PORT);
    
})