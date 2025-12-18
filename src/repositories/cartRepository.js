const Cart = require('../Schema/cartSchema');
const User = require('../Schema/userSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/internalServerError');
const NotFoundError = require('../utils/notFoundError');


async function createCart(userId) {
    try {
        const newCart = await Cart.create({
            user : userId
        }) ;
        return newCart ;
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
        throw new InternalServerError();

    }
}
async function getCartByUserId(userId) {
    
    try {
        if (!userId) {
            throw new BadRequestError('UserId is required');
        }
        const userExists = await User.findById(userId);
        if (!userExists) {
            throw new NotFoundError('User does not exist');
        }   

        const cart = await Cart.findOne({
            user : userId
        }).populate('items.product') ;

        return cart ;

    } catch (error) {
        
        console.log(error.message);
        
        console.log("repo laye");
        throw error instanceof Error ? error : new InternalServerError();

    }
}
async function clearCart(userId) {
    
    try {
        const cart = await Cart.findOne({
            user:userId
        } );
        if(!cart){
            throw new NotFoundError("Cart");
        }
        cart.items = [] ;
        await cart.save();
        return cart;

    } catch (error) {
        throw new InternalServerError();
    }
}
module.exports = {
    createCart,
    getCartByUserId ,
    clearCart
}