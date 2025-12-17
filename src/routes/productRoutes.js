const express = require('express');
const { addProduct, getProduct, deleteProduct } = require('../Controller/productController');
const uploader = require('../middlewares/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../Validation/authValidator');
const productRouter = express.Router();

productRouter.post(
    '/' ,
    isLoggedIn ,
    isAdmin ,
    uploader.single('productImage'),
    addProduct
);
productRouter.get('/:id',getProduct);
productRouter.delete('/:id',deleteProduct);

//get/products/:id
//delete/products/:id


module.exports = productRouter;