const { getCartByUserId } = require("../repositories/cartRepository");
const { getProductById } = require("../repositories/productRepository");
const AppError = require("../utils/appError");
const BadRequestError = require("../utils/badRequestError");
const NotFoundError = require("../utils/notFoundError");

async function getCart(userId) {
    const cart  = await getCartByUserId(userId);
    if(!cart){
        throw new NotFoundError(cart);
    }
    return cart;
}

async function addToCart(userId , productId) {
    const cart  = await getCart(userId);
    const product = await getProductById(productId);
    if(!product){
        throw new NotFoundError(product);
    }

    if(!product.inStock && product.quantity <= 0){
        throw new BadRequestError("Product Not available in Stock ");
    }

    // may be product is already in the cart
    let foundProduct = false ;
    cart.items.forEach(item =>{
        // manual choersion 
        console.log(item);
        
        if(item.product._id.toString() === productId)  {
            if (product.quantity >= item.quantity +1) {
                item.quantity+=1;
            } else {
                throw new AppError("The quantity of the item requested is not available decrease quantity ",404) ;
            }
            
            foundProduct = true;
        }
    })
    if(!foundProduct){
        cart.items.push ({
            product : productId ,
            quantity : 1
        })
    }

    // for these type of funct do google search 
    await cart.save();

    /* sirf cart mai add karne sai product ki qty kam nhi khoni chhye
        jab order place ho jaye uske baad qty decrease hon achhye
        product.quantity -=1 ; 
        await product.save() ;
    */ 
    

    return cart ;

}

module.exports = {
    getCart ,
    addToCart
}