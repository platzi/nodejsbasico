module.exports = {
    // Versión síncrona
    //*****************
    syncSum: function(a, b) {
        console.log(a+b);
    },
    // Versión asíncrona
    //******************
    asyncSum: function(a, b) {
        setTimeout(()=>{
            console.log(a+b);
        }, 5000);
    }
}