const MAYORIA_DE_EDAD = 18

module.exports = {
    
    calcularEdad: function (fechaNacimiento){
        let dia = 1000 * 60 * 60 * 24
        let hoy = new Date()
        fechaNacimiento = new Date(fechaNacimiento);
        let edad = Math.abs(hoy - fechaNacimiento)
        edad = (edad / dia) / 365

        return Math.floor(edad)
    },
    esMayor: ({edad}) => edad > MAYORIA_DE_EDAD

}