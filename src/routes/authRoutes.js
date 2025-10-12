

const express = require('express');
const { login } = require('../Controller/authController');
// we have to initilise a router object to add routes in a new file 
// routers are used for segregating your routes to different module
const authRouter =  express.Router();

authRouter.post('/login',login) ; // this is a route registration
//userRouter.get('/',getUser) ; // this is a route to show all users


module.exports = authRouter ; // exporting the router 


