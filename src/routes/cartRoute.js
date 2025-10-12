const express = require('express');
const { getCartById } = require('../Controller/cartController');

const cartRouter = express.Router();

cartRouter.get('/:id',getCartById);

module.exports = cartRouter;