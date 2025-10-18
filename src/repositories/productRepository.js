const product = require('../Schema/productSchema')

async function createProduct(productDetails) {
    try {
        const response = await product.create(productDetails);
        return response;
    } catch (error) {
        console.log(error);
        
    }
}

async function getProductById(productId) {
    try {
        const prod = await product.findById(productId);
        return prod;
    } catch (error) {
        console.log(error);
        
    }
}

async function deleteProductById(productId) {
    try {
        const prod = await product.findByIdAndDelete(productId);
        return true;
    } catch (error) {
        console.log(error);
        
    }
}

module.exports ={
    createProduct,
    getProductById,
    deleteProductById
}