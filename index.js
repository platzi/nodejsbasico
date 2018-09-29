const express = require("express");
const app = express();
const { PORT } = require("./config");

require("./routes/views")(app);
require("./routes/api")(app);

function init(){
    console.log("Iniciando instancia de Express...");
    app.listen(PORT, ()=>{
        console.log("El servidor Express esta activo.");
    });
}

init();