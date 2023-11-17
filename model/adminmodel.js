const mongoose = require('mongoose')

const adminUpload = new mongoose.Schema({
    name: String,
    link: String,

    image:{
        imageName: String,
        path: String
    },
    point: Number,
    category: String,
    subCategory: String,
})

const adminModel = mongoose.model('adminModel', adminUpload)

module.exports = adminModel