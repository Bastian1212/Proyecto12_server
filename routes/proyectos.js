const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectosController");
const auth = require("../middleware/auth");
const {check } = require("express-validator");
// crea un proyectos  
// api/proyectos
router.post("/" ,
    auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio ").not().isEmpty()
    ],
    proyectoController.crearProyecto

)

// obtenr todos los poryectos
router.get("/" ,
    auth,
    proyectoController.obtenerProyectos

)

// Actualizar proyectos via  ID 

router.put("/:id", 
    auth,
    [
        check("nombre", "El nombre del proyecto es obligatorio ").not().isEmpty()
    ],
    proyectoController.actualizarProyecto

);

// Eliminar un Proyecto 
router.delete("/:id", 
    auth,
    proyectoController.eliminarProyecto

);


module.exports = router;
