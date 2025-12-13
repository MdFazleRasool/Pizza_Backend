const cloudinary = require('../config/cloudinaryConfig');
const productRepository = require('../repositories/productRepository');
const fs = require('fs/promises');


async function createProduct(productDetails) {
    /* 1. we should check if an image is coming ,
       to create a product then -> we should first upload 
       it on Cloudinary
    */
    const imagePath=productDetails.imagePath;
    if(imagePath){
        try {
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
            var productImage = cloudinaryResponse.secure_url;
            await fs.unlink(imagePath);

        } catch (error) {
            console.log("Service Layer",error);
            throw{reason : 'Not able to create Product Service Layer :-(line no :- 20)' , statusCode:500}
            //throw error;
            
        }

    }
    /* 2. Then we use the uel from the cloudinary and other products to add products in db    */    
    const  product = await productRepository.createProduct({
        ...productDetails,
        productImage:productImage
    }) ;

    if(!product){
        throw{reason : 'Not able to create Product Service Layer' , statusCode:500}
    }
    return product;
}


async function getProductById(productId){
    const response = await productRepository.getProductById(productId)
    if(!response){
        throw { reason :'Not able to find the product' ,statusCode : 404}
    }
    return response;
}


async function deleteProductById(productId){
    const response = await productRepository.deleteProductById(productId)
    if(!response){
        throw { reason :'cannot delete the Product  the product' ,statusCode : 500}
    }
    return response;
}

module.exports={
    createProduct,
    getProductById,
    deleteProductById
}