const { getCart } = require("../Service/cartService");
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

module.exports = {
    getCartByUser
}