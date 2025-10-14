require('dotenv').config(); 
const express = require('express');
const cookieparser = require('cookie-parser');
const ServerConfig = require('./config/serverConfig');
//const bodyParser = require('body-parser'); // not yet deprecated
const connectDB = require('./config/dbConfig');
const User = require('./Schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const authRouter = require('./routes/authRoutes');
const { isLoggedIn } = require('./Validation/authValidator');
const uploader = require('./middlewares/multerMiddleware');
const cloudinary = require('./config/cloudinaryConfig');
const fs = require('fs/promises');
const productRouter = require('./routes/productRoutes');





const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
app.use(cookieparser());
// Routing middleWare 
// if your request routs starts wwith /users -> then handle it using userRouter    

app.use('/users',userRouter); // this line connects the router to the server 
app.use('/auth',authRouter);
app.use('/products',productRouter)


/*
app.use('/carts',cartRouter); // this line connects the router to the server 
*/


app.get('/ping',isLoggedIn, (req, res) => {
    //controller
    console.log(req.body);
    console.log(req.cookies);
    return res.json({ message: 'setup checking' });
})

/* before mvc architecture just created  to check the flow , and working or not (now check controller for more )
app.post('/photo', uploader.single('Incomingfile'), async(req, res) => {
    console.log(req.file);
    const result = await cloudinary.uploader.upload(req.file.path)
    console.log("Result From Cloudinary",result); 
    await fs.unlink(req.file.path);
    return res.json({
        message: 'File uploaded successfully',
        file: req.file
    });
});
*/
app.listen(ServerConfig.PORT, async () => {
    await connectDB();
    console.log(`Server Started At Port ${ServerConfig.PORT}`);
    /*  
        console.log(process.env.windir);
        console.log(process.env);
        console.log(process.env.PORT);
    */

    /* 
    const newUser = await User.create({
        email: 'fazle@gmail.com',
        password: '1dfsdfdfds',
        firstName: 'fazle',
        lastName: 'mfr',
        mobileNumber: '7004376885'
    });
    console.log("Created new User");
    console.log(newUser);
    */
});


//localhost:5500/users - POST(create the user)
//localhost:5500/carts/667867 - GET