const express = require("express");
const app = express();
const { PORT } = require("./config");
const mongo = require("./db/connect");

require("./routes/api")(app);
require("./routes/views")(app);

async function initDB(){
    const db = await mongo.connect();
    if (db) { initExpress(); }
}

function initExpress(){
    console.log("Iniciando instancia de Express...");
    app.listen(PORT, ()=>{
        console.log("El servidor Express esta activo.");
    });
    process.on("SIGINT", closeApp);
    process.on("SIGTERM", closeApp);
}

function closeApp(){
    mongo.disconnect()
        .then(()=>process.exit(0));
}

initDB();