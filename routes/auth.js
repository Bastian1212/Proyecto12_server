//Rutas para autenticar llos usuarios 
const express = require("express");
const router = express.Router();
const {check} = require("express-validator");

const authController = require("../controllers/authController");
const auth = require("../middleware/auth");

// Iniciar sesion
// api/auth

router.post("/" ,
    authController.autenticarUsuario

);
//obtiene el ususario autenticado 
router.get("/", 
    auth,
    authController.usuarioAutenticado
);

module.exports = router; 

