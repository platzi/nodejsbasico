module.exports = {
    from0to: function(n, inc) {
        console.log(`Counting from 0 to ${n} by ${inc}:`);
        for(let i = 0; i < n; i += inc){
            console.log(i);
        }
    },
    asyncFrom0to: function(n, inc) {
        setImmediate(()=>{
            console.log(`Counting from 0 to ${n} by ${inc}:`);
            for(let i = 0; i < n; i += inc){
                console.log(i);
            }    
        })
    }
}