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

        const {proyecto} = req.body; 
        console.log("desde crear tarea");
        console.log(proyecto);
        const existeProyecto = await Proyecto.findById(proyecto);
        console.log(existeProyecto);
        if(!existeProyecto){
            return res.status(404).json({msg : "Proyecto no encontrado"})
        }

        // revisar si el proyecto actual pertenece al usuario autenticado 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No Autorizado"});
        }

        // Creamos la tarea  
        const tarea = new Tarea(req.body);
        await tarea.save();
        res.json({tarea});




        
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error")
    }

} 



exports.obtenerTareas = async (req,res) => {
    try {

        const {proyecto} = req.query; 
        const existeProyecto = await Proyecto.findById(proyecto);
        

        //console.log(existeProyecto);
        if(!existeProyecto){
            return res.status(404).json({msg : "Proyecto no encontrado"})
        }

        // revisar si el proyecto actual pertenece al usuario autenticado 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No Autorizado"});
        }

        // obtener tareas por poryectos 

        const tareas = await Tarea.find({proyecto}).sort({creado : -1}); 
        res.json({tareas}); 

    }catch (error) {
        console.log(error);
        res.status(500).send("Hubo un error")
        
    }

}


exports.actualizarTarea = async (req, res) => {

    try {
        const {proyecto, nombre, estado} = req.body; 

        // Revisar si la tarea existe
        let tarea = await Tarea.findById(req.params.id);

        if(!tarea){
            return res.status(401).json({msg: "No existe la tarea "});
        }
    
        //Extrar el proyecto 
        const existeProyecto = await Proyecto.findById(proyecto);

        // revisar si el proyecto actual pertenece al usuario autenticado 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No Autorizado"});
        }

        // Crear un objeto con la nueva tarea 
        const nuevaTarea = {}; 
        nuevaTarea.nombre =nombre;
        nuevaTarea.estado = estado; 
        
        // guardar tarea 
        tarea = await Tarea.findByIdAndUpdate({_id : req.params.id}, nuevaTarea, {new: true});
        console.log(tarea);
        res.json({tarea}); 
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un Error");
        
    }
}

exports.eliminarTarea = async (req, res) => {
    try {
        const {proyecto} = req.query; 

        // Revisar si la tarea existe
        const tareaExiste = await Tarea.findById(req.params.id);

        if(!tareaExiste){
            return res.status(401).json({msg: "No existe la tarea "});
        }
    
        //Extrar el proyecto 
        const existeProyecto = await Proyecto.findById(proyecto);

        // revisar si el proyecto actual pertenece al usuario autenticado 
        if(existeProyecto.creador.toString() !== req.usuario.id){
            return res.status(401).json({msg: "No Autorizado"});
        }
        //Eliminar
        await Tarea.findByIdAndDelete({_id: req.params.id});
        res.json({msg : "Tarea Eliminada"});
       
    } catch (error) {
        console.log(error);
        res.status(500).send("Hubo un Error");
        
    }

}