const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required : [true ,"First Name is Required"] ,
        minlength : [3 , "first name must be atleast 3 characters long"] ,
        lowercase:true ,
        trim : true  , // if the user has given extra spaces then i t will remove it auto matically
        maxlength : [20 , "first name must be less then  20 characters long"] ,

        
    } ,
    lastName: {
        type:String,
        required : [true ,"last Name is Required"] ,
        minlength : [3 , "last name must be atleast 3 characters long"] ,
        lowercase:true ,
        trim : true  , // if the user has given extra spaces then it will remove it auto matically
        maxlength : [20 , "last name must be less then  20 characters long"] , 
    },
    mobileNumber:{
        type:String,
        trim : true,
        unique:[true, "Phone no already in use"] ,
        required : [true , "phone number should be provided "],
        minlength:5,
        maxlength:10
    },
    email:{
        type:String,
        trim:true,
        required:[true, "Email should be Provided"] ,
        unique:[true,"Email Must be Unique"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        trim:true,
        required:[true, "Password must not be empty"] ,
    },
    
},{ timestamps:true });

use

const User = mongoose.model("User",userSchema);

module.exports = User ;