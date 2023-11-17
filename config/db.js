const mongoose = require('mongoose')
require('dotenv').config()
const dbConnect = async() =>{
    try{
        await mongoose.connect(process.env.uri)
        console.log('MongoDB connected')
    }
    catch(err){
        console.err(err)
    }
}

module.exports = dbConnect()