const product = require('../Schema/productSchema')
const { createProduct, deleteProductById, getProductById } = require('../Service/productService');
const AppError = require('../utils/appError');

async function addProduct(req, res) {
    /* 
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log("Result From Cloudinary",result); 
    await fs.unlink(req.file.path);
    return res.json({
        message: 'File uploaded successfully',
        file: req.file
    });
    */  
    console.log("product Controller Layer \n", req.file); // will be undefined if no file is uploaded


    try {

        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file?.path,
            price: req.body.price,
            category: req.body.category, // if category is undefiened (check product schema)
            inStock: req.body.inStock, // if in Stock is undefined then true will be stored

        });
        return res.status(201).json({
            success: true,
            message: 'Successfully created the product',
            data: product,
            error: {},
        });
    }

    catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            })
        }
        console.log("Controller Layer \n", error);
        return res.status(error.statusCode).json({
            success: false,
            message: 'Something went wrong Controller layer',
            data: {},
            error: error
        })
    }

}

async function getProduct(req, res) {
    try {
        const response  = await getProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the product',
            data: response,
            error: {},
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            })
        }
        console.log("Controller Layer \n", error);
        return res.status(error.statusCode).json({
            success: false,
            message: 'Something went wrong Controller layer',
            data: {},
            error: error
        })
    }
}

async function deleteProduct(req, res) {
    try {
        const response  = await deleteProductById(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully deleted the product',
            data: response,
            error: {},
        });
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            })
        }
        console.log("Controller Layer \n", error);
        return res.status(error.statusCode).json({
            success: false,
            message: 'Something went wrong Controller layer',
            data: {},
            error: error
        })
    }
}

module.exports = {
    addProduct,
    getProduct,
    deleteProduct
}