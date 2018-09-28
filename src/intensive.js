const loopLimit = 1e9;
module.exports = {
    simulateSync: function(){
        console.log('Comenzando bloqueo simulado...');
        for(let i = 0; i <= loopLimit; i += 1) {
            // Simulación para operación intensiva
            //  - Cifrado
            //  - Compresión
            //  - Proceso de datos
            //  - Petición HTTP
            //  - Query a base de datos
            if (i === loopLimit) console.log("He llegado al final!");
        }
        console.log('El bucle ha finalizado!');
    },
    simulateAsync: function(){
        console.log('Comenzando bloqueo simulado...');
        setImmediate(()=>{
            for(let i = 0; i <= loopLimit; i += 1) {
                // Simulación para operación intensiva
                //  - Cifrado
                //  - Compresión
                //  - Proceso de datos
                //  - Petición HTTP
                //  - Query a base de datos
                if (i === loopLimit) console.log("He llegado al final!");
            }
        });
        console.log('El bucle ha finalizado!');
    }
}