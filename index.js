const math = require('./math.js');//requiere copmo parametro la dirección que se esta importando
const greet = require('./greetings');
const hello = require('./greetings/hello.js');



console.log(math.add(4,5));
console.log(math.divide(4,5));
console.log(math.multiply(4,5));
console.log(math.substract(4,5));

console.log(greet.greet('Pame'));

console.log (hello.sayHello('Cinthya'));