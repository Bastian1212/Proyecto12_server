const express = require("express");
const router = express.Router();
const tareaController = require("../controllers/tareaController");
const auth = require("../middleware/auth");
const {check } = require("express-validator");


// crear  una tarea 
// api/tarea

router.post("/",
    auth, 
    [
        check("nombre", "El Nombre es obligatorio").not().isEmpty(), 
        check("proyecto", "El Proyecto es obligatorio").not().isEmpty()
    ],
    tareaController.crearTarea
); 

router.get("/", 
    auth,
    tareaController.obtenerTareas

)

router.put("/:id",
    auth,
    tareaController.actualizarTarea

)


module.exports = router;
