const mongoose = require('mongoose')

const DBconnection= async ()=>{
    try{
    mongoose.connect(process.env.MONGO_URI)
        console.log('MongoDB Connected')
    
}catch(err){
        console.log(err)
        process.exit(1)
    }
}

module.exports = DBconnection