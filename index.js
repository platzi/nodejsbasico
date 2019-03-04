const date = require('./date');

var persona = {
    nombre: 'Tey',
    edad: '',
    fechaNacimiento: '1991-10-01'
}

persona.edad = date.calcularEdad(persona.fechaNacimiento);

console.table(`Mi nombre es ${persona.nombre}, tengo ${persona.edad} años y ${date.esMayor(persona) ? `soy` : `no soy`} mayor de edad`)