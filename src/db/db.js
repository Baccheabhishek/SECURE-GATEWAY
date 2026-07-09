const mongoose = require("mongoose");

async function connectDB(){

try{
   await mongoose.connect(process.env.MONGODB_URI)
    console.log("database is connected");
}
catch(err){
    console.log("database is not connected");
    
}


}

module.exports=connectDB;