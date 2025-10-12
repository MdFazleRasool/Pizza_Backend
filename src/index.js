const express = require('express');
const ServerConfig = require('./config/serverConfig');
//const bodyParser = require('body-parser'); // not yet deprecated
const connectDB = require('./config/dbConfig');
const User = require('./Schema/userSchema');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded());
// Routing middleWare 
// if your request routs starts wwith /users -> then handle it using userRouter    
app.use('/users',userRouter); // this line connects the router to the server 
//app.use('/carts',cartRouter); // this line connects the router to the server 

app.post('/ping', (req, res) => {
    console.log(req.body);
    return res.json({ message: 'setup checking' });
})

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