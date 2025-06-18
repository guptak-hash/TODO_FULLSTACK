const mongoose=require('mongoose');
require('dotenv').config();

const connectDB=()=>{
    const mongoUrl = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/todoDB';
mongoose.connect(mongoUrl).then(()=>{
    console.log('DB connection success ')
}).catch((err)=>{
    console.log('DB connection fail')
})
}

module.exports=connectDB