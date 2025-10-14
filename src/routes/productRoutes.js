const express = require('express');
const { addProduct } = require('../Controller/productController');
const uploader = require('../middlewares/multerMiddleware')
const productRouter = express.Router();

productRouter.post('/',uploader.single('productImage'),addProduct);

module.exports = productRouter;