const mongoose = require("mongoose");

const TareaSchema = mongoose.Schema({
    nombre: {
        type : String,
        required : true, 
        trim : true

    },
    estado: {
        type : Boolean, 
        default: false

    },
    creado: {
        type: Date, 
        default: Date.now()

    },
    proyecto : {
        type: mongoose.Schema.Types.ObjectId,
        ref : "Poryecto"

    }

});

module.exports = mongoose.model("Tarea",TareaSchema);