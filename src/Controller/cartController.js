const { getCart, modifyCart, clearProductsFromCart } = require("../Service/cartService");
const AppError = require("../utils/appError");


async function getCartByUser(req, res) {
    try {
        const cart = await getCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully fetched the cart",
            error: {},
            data: cart

        })
    } catch (error) {
        console.log("cart Controller Layer ",error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message || 'something went worng controller layer getCartByUser',
            error: error,
            data: {}
        })

    }

}
/* implementing add /remove in the same function
    * http://localhost:5500/carts/remove/6942fa3cfd2616ae029d4647
    * http://localhost:5500/carts/add/6942fa3cfd2616ae029d4647

*/ 
async function modifyProductToCart(req, res) {
    
    try {
        const cart = await modifyCart(req.user.id , req.params.productId,req.params.operation == 'add');
        return res.status(200).json({
            success: true,
            message: "Successfully modified product in  the cart",
            error: {},
            data: cart

        })
    } catch (error) {
        console.log("cart Controller Layer ",error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message || 'something went worng controller layer getCartByUser',
            error: error,
            data: {}
        })

    }

}

async function clearCartById(req,res) {
    try {
        const cart = await clearProductsFromCart(req.user.id);
        return res.status(200).json({
            success: true,
            message: "Successfully cleared All  product in  the cart",
            error: {},
            data: cart

        })
    } catch (error) {
        console.log("cart Controller Layer ",error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                error: error,
                data: {}
            })
        }
        return res.status(500).json({
            success: false,
            message: error.message || 'something went worng controller layer getCartByUser',
            error: error,
            data: {}
        })

    }
}

module.exports = {
    getCartByUser ,
    modifyProductToCart ,
    clearCartById
}