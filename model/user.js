const mongoose = require('mongoose')

const user = new mongoose.Schema({
    name: String,
    email: String,
    pass:String,

    points: Number,
    
})

const userModel = mongoose.model('userModel', user)

module.exports = userModel