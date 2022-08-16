const mongoose = require("mongoose");

const usuariosSchema = mongoose.Schema({
    Nombre: {
        type : String, 
        required: true,
        trim:true
    },
    Apellido : {
        type : String, 
        required: true,
        trim:true

    },
    Email : {
        type : String, 
        required: true,
        trim:true,
        unique: true

    },
    Password : {
        type : String, 
        required: true,
        trim:true

    },
    registro : {
        type : Date,
        default: Date.now()

    }
    
});

module.exports = mongoose.model("Usuario", usuariosSchema);