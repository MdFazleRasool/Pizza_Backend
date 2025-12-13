const product = require('../Schema/productSchema')
const { createProduct } = require('../Service/productService')

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
    console.log("product Controller Layer", req.file); // will be undefined if no file is uploaded


    try {

        const product = await createProduct({
            productName: req.body.productName,
            description: req.body.description,
            imagePath: req.file.path,
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
        console.log("Controller Layer", error);
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }

}

module.exports = {
    addProduct
}