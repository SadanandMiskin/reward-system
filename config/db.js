const mongoose = require('mongoose')
require('dotenv').config()
const dbConnect = async() =>{
    try{
        await mongoose.connect('mongodb://0.0.0.0:27017')
        console.log('MongoDB connected')
    }
    catch(err){
        console.err(err)
    }
}

module.exports = dbConnect()