const mongoose = require ('mongoose')

const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"Product Name Can't Be Empty"],
        minLength:[3,"Product Name Must be Atleast 3 Characters"] ,
        trim :true
    },
    description:{
        type:String,
        required:[true,"Product Must Be Defined"],
        trim :true
    },
    ProductImage:{
        type:String,
    },
    Price:{
        type:Number ,
        required:[true,"Product Price is required"]
    },
    category:{
        type:String,
        enum:['veg','non-veg','drinks','sides'],
        default:'Product Category Not Defined'
    },
    inStock:{
        type:Boolean,
        required:[true,"In Stock Status is Required"],
        default : true
    }
},{
    timestamps:true
}) ;

const product = mongoose.model('Product',productSchema) ;

module.exports = product;

