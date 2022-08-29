const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');


exports.autenticarUsuario = async (req, res )  => {
    // revisar si hay errores 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }

    const {email , password } = req.body;

    try{
        // Revisar si el usuario esta registrado

        let usuario = await Usuario.findOne({email});
        if(!usuario){
            return res.status(400).json({msg : "El usuario no existe"});
        }

        // revisar clave 
        const passCorrecto = await bcryptjs.compare(password, usuario.password);
        if(!passCorrecto){
            return res.status(400).json({msg : "PassWord Incorrecto"});
        }

        //  todo ok 

         // Crear y firmar el jwt
        const payload = {
            usuario: {
                id: usuario.id
            }
        };


        // firnmar el JWT 
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // 1 hora
        }, (error, token) => {
            if(error) throw error;

            // Mensaje de confirmación
            res.json({ token  });
        });


    }catch(error){
        console.log(error);

    }
    


}

// obtiene que usuario este autenticado

exports.usuarioAutenticado = async (req,res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id);
        res.json({usuario});
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: "hubo un error"});
        
    }
}