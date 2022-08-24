const express = require("express");
const router = express.Router();
const proyectoController = require("../controllers/proyectosController");
// crea un proyectos  
// api/proyectos
router.post("/" ,
    proyectoController.crearProyecto

)


module.exports = router;
