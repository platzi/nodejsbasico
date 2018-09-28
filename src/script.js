const args = require('yargs').argv;
const { base } = args;

function multiplesTable(base) {
    console.log(`Tabla de múltiplos de ${base}`)
    for(let i = 0; i < 10; i += 1) {
        console.log(`${base}x${i}=${base*i}`);
    }
}

if (base && !isNaN(base)) {
    multiplesTable(base);
} else {
    // Opcion #1
    /********** */
    throw new Error("Argument 'base' not defined");

    // Opcion #2
    /********** */
    /* console.error("Argument 'base' not defined");
    return; */
}

module.exports = {
    table: multiplesTable
}