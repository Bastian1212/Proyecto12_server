const Tarea = require("../models/Tarea");
const Proyecto = require("../models/Proyecto");
const {validationResult} = require("express-validator");


 // Crea una nueva tarea 

exports.crearTarea = async (req, res ) => {
     // revisar si hay errores 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    // Extraer el poryecto y comprobar si existe 

    try {
        const proyecto = await Proyecto.findById(proyecto);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error")
    }


} 