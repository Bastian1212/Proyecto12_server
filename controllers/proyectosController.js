const Proyecto = require("../models/Proyecto");
const {validationResult} = require("express-validator");
exports.crearProyecto = async (req, res ) => {

    // revisar si hay errores 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }
ß
    try{
        // crear un numevo proyecto 
        const proyecto = new Proyecto(req.body);

        // Guardar el creador via JWT

        proyecto.creador = req.usuario.id;

        // guardamos el proyecto 
        await proyecto.save();
        res.json(proyecto);

    } catch(error){
        console.log(error);
        res.status(500).send("Hubo un Error");
    }

}


//Obtiene todo los proyectos del usuario actual 

exports.obtenerProyectos = async(req, res ) => {
    try {
        const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado : -1 });
        res.json({proyectos})
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error");

        
    }
}