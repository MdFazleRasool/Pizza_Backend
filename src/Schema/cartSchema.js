const mongoose = require('mongoose')
const product = require('./productSchema')

const cartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.type.ObjectId ,
        required: true ,
        ref: 'User'
    },
    items: [
        {
            product: {
                type: mongoose.Schema.type.ObjectId ,
                ref: 'Product' ,
                required: true ,
            },

            quantity: {
               
                type: Number ,
                required: true ,
                default : 1
            }
        }
    ],


},{
    timestamps : true
}) ;

const Cart = mongoose.model('Cart' , cartSchema) ;

module.exports = Cart ;