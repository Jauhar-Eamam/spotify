const mongoose = require('mongoose');




async function connectToDb(){
    try{
        await mongoose.connect(process.env.MONGO_SECRET)
        console.log("Db connected successfully");
        
    }catch(err){
        console.error(err)
    }
}


module.exports = connectToDb;