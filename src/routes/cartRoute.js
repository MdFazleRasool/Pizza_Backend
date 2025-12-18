const express = require('express');
const {  getCartByUser, addProductToCart } = require('../Controller/cartController');
const { isLoggedIn } = require('../Validation/authValidator');

const cartRouter = express.Router();

cartRouter.get('/',isLoggedIn,getCartByUser);

cartRouter.post('/add/:productId',isLoggedIn,addProductToCart);


module.exports = cartRouter;