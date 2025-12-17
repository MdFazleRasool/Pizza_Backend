const cloudinary = require('../config/cloudinaryConfig');
const productRepository = require('../repositories/productRepository');
const fs = require('fs/promises');
const InternalServerError = require('../utils/InternalServerError');
const NotFoundError = require('../utils/notFoundError');


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
            

            /* more ways to unlink image from the folder (upload)
                await fs.unlink(process.cwd() + "/" + imagePath);
            */ 

        } catch (error) {
            console.log("Service Layer",error);
            throw new InternalServerError();
            //throw{reason : 'Not able to create Product Service Layer :-(line no :- 20)' , statusCode:500}
            //throw error;
            
        }

    }
    /* 2. Then we use the uel from the cloudinary and other products to add products in db    */    
    const  product = await productRepository.createProduct({
        ...productDetails,
        productImage:productImage
    }) ;
    /* for better Error Handling(E.H) this was removed 
        this function is called by product Controller check there for E.H
    if(!product){
        throw{reason : 'Not able to create Product Service Layer' , statusCode:500}
    }
    */ 
    return product;
}


async function getProductById(productId){
    const response = await productRepository.getProductById(productId)
    if(!response){
        console.log("Product Service layer get Product by id func");
        throw new NotFoundError('Not able to find the product');
        //throw { reason :'Not able to find the product' ,statusCode : 404}
    }
    return response;
}


async function deleteProductById(productId){
    const response = await productRepository.deleteProductById(productId)
    if(!response){
        console.log("Product Service layer delete product by id func");
        throw new NotFoundError('Not able to find the product');
        
        //throw { reason :'cannot delete the Product  the product' ,statusCode : 500}
    }
    return response;
}

module.exports={
    createProduct,
    getProductById,
    deleteProductById
}