const product = require('../Schema/productSchema');
const InterServerError = require('../utils/interServerError');
const BadRequestError = require('../utils/badRequestError');


async function createProduct(productDetails) {
    try {
        const response = await product.create(productDetails);
        return response;
    } catch (error) {

        if (error.name === "ValidationError") {
            // badrequesteror kai andar params bhejna hoga to kaise milega
            //error.errors kai andar dikhega
            const errorMessageList = Object.keys(error.errors).map((param) => {
                return error.errors[param].message ;
            })
            throw new BadRequestError(errorMessageList);
        }
        console.log(error);
        throw new InterServerError();

        /*
        console.log(error.name);
        console.log(error.errors);
        console.log(Object.keys(error.errors));
        Object.keys(error.errors).forEach((param) => {
            console.log(param , error.errors[param].message);
        })
        
        */


    }
}

async function getProductById(productId) {
    try {
        const response = await product.findById(productId);
        return response;
    } catch (error) {
        console.log(error);
        throw new InterServerError();

    }
}

async function deleteProductById(productId) {
    try {
        const response = await product.findByIdAndDelete(productId);
        return response;
    } catch (error) {
        console.log(error);
        throw new InterServerError();
    }
}

module.exports = {
    createProduct,
    getProductById,
    deleteProductById
}