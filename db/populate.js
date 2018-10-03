const mongo = require("./connect");
const argv = require('yargs').argv;
const usersData = require("../resources/users");

if (argv.fill) {
    mongo.connect()
        .then(db=>{
            db.collection("users").insertMany(usersData, (err, result)=>{
                if (err) throw err;
                console.log("Los datos han sido insertados satisfactoriamente!");
                mongo.disconnect();
            });
        })
    return;
}

if (argv.clear) {
    mongo.connect()
        .then(db=>{
            db.collection("users").drop((err, result)=>{
                if (err) throw err;
                console.log("La colección se ha descartado satisfactoriamente!");
                mongo.disconnect();
            });
        })
    return;
}