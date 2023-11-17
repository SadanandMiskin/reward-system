const mongoose = require('mongoose')

const userUpload = new mongoose.Schema({
    userId: String,
    userName: String,
    userEmail:String,
    userImage:{
            imageName: String,
            path: String
       },
       appName: String,
    adminImage:{
        imageName: String,
            path: String
    },
    point: Number
})

const userImageModel = mongoose.model('userImageModel' , userUpload)

module.exports = userImageModel