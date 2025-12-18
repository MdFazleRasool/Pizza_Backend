const Cart = require('../Schema/cartSchema');
const User = require('../Schema/userSchema');
const BadRequestError = require('../utils/badRequestError');
const InternalServerError = require('../utils/InternalServerError');


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

module.exports = {
    createCart,
    getCartByUserId
}