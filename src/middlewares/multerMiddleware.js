const multer = require('multer')
const path = require('path'); // 👈 You missed this line earlier!

const storageConfiguration=multer.diskStorage({
    destination:(req,file,next) =>{
        next(null,'uploads/')
    },
    filename:(req,file,next) => {
        console.log(file);
        console.log(file.originalname);
        next(null,`${Date.now()}${path.extname(file.originalname)}`)
    }
})
const uploader = multer({storage:storageConfiguration}); 
module.exports = uploader;