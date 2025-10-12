// Resource - User
// /users


const express = require('express');
const { createUser, getUser } = require('../Controller/userController');
// we have to initilise a router object to add routes in a new file 
// routers are used for segregating your routes to different module
const userRouter =  express.Router();

userRouter.post('/',createUser) ; // this is a route registration
//userRouter.get('/',getUser) ; // this is a route to show all users


module.exports = userRouter ; // exporting the router 


