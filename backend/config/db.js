const mongoose = require('mongoose')
require("dotenv").config()

const DBconnection= async ()=>{
    try{
   await mongoose.connect(process.env.MONGO_URI)
   console.log('MongoDB Connected')
    
}catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = DBconnection