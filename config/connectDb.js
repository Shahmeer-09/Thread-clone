const mongoose = require('mongoose')

const connectDb =async ()=>{
     return  Promise.resolve(
        mongoose.connect(process.env.MONGO_URL_CONNECT)
        
    )
}

module.exports= {connectDb}