const express = require("express");


// crear el servidor 

const app  =express();

const PORT = process.env.PORT || 4000;

//definir la pagina principal 
app.get("/", (req, res) => {
    res.send("desde la api ")
})



//app 
app.listen(PORT, () => {
    console.log("El servidor esta funcionando desde el puerto " + PORT);
})
