const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId ,
        ref:'User',
        required : true
    } ,
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
    totalPrice : {
        type:Number , 
        required:true ,
    } ,
    status : {
        type:String ,
        default : "ORDERED" ,
        enum : ["ORDERED" , "PROCESSING" , "CANCELLED" ,"OUT_FOR_DELIVERY", "DELIVERED"]
    } ,
    address : {
        type : String ,
        minLength : [10, " address should be of atleast 10 characters"]
    } ,
    paymentMethod : {
        type : String ,
        enum : ["ONLINE" , "CASH"]
    }
},{
    timestamps : true
})

const Order = mongoose.model('Order',orderSchema)

module.exports = Order ;