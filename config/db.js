const mongoose = require("mongoose");
require("dotenv").config({path:"variables.env"});

const conectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO,{  
        })
        console.log("connect db ok ")
    }catch(error){
        console.log(error);
        process.exit(1);   // Detener la app 
    }

}


module.exports = conectDB;