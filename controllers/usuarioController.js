const Usuario = require("../models/Usuario");

exports.crearUsuario = async(req,res) => {

    //extrar email y password 
    const {email,  password} = req.body;

    try{

        let usuario = await Usuario.findOne({email});
        if(usuario){
            return res.status(400).json({msg: "El usuario ya existe "})
        }
        // crea el nuevo usuario 
        usuario = new Usuario(req.body);

        // guarda el nuevo usuario 
        await usuario.save();

        res.json({msg: "Usuario creado correctamente"});
    }catch (error){
        console.log(error);
        res.status(400).send("hubo un error  xd ");

    }
}