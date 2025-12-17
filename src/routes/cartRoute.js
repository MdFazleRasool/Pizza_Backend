const express = require('express');
const {  getCartByUser } = require('../Controller/cartController');
const { isLoggedIn } = require('../Validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/',isLoggedIn,getCartByUser);

module.exports = cartRouter;