const Usuario = require("../models/Usuario");
const bcryptjs = require("bcryptjs");
const {validationResult} = require ("express-validator");
exports.crearUsuario = async(req,res) => {
    // revisar si hay errores 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors : errors.array()})
    }


    //extrar email y password 
    const {email,  password} = req.body;

    try{
        // revisar que el usuario registrado sea unico 
        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: "El usuario ya existe "})
        }
        // crea el nuevo usuario 
        usuario = new Usuario(req.body);

        //Hashear el password 
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);


        // guarda el nuevo usuario 
        await usuario.save();

        res.json({msg: "Usuario creado correctamente"});
    }catch (error){
        console.log(error);
        res.status(400).send("hubo un error  xd ");

    }
}