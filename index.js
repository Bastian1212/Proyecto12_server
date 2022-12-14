const express = require("express");
const  conectDB = require("./config/db");
const cors = require("cors");

// crear el servidor 

const app  =express();

// conectar a la base de datos 
conectDB();

// habilitar cors }
app.use(cors());

// Habilitar express.json
app.use(express.json({extended: true}))

// puerto de la app 
const PORT = process.env.PORT || 4000;


// importar rutas 

app.use("/api/usuarios", require("./routes/usuarios"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/proyectos", require("./routes/proyectos"));
app.use("/api/tareas", require("./routes/tareas"));

//definir la pagina principal 
app.get("/", (req, res) => {
    res.send("desde la api ")
})



//app 
app.listen(PORT, () => {
    console.log("El servidor esta funcionando desde el puerto " + PORT);
})
