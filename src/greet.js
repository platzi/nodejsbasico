const EventEmitter = require('events');
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('clap', () => {
    console.log('A clapping event was produced.');
});

myEmitter.on('greet', name => {
    console.log(`Please, greet ${name}!`);
});

myEmitter.on('shout', text => {
    console.log(`Ohh... someone told you to shout ${text}!!!!`);
});

myEmitter.on('call', (name, cb) => {
    cb(name);
});

module.exports = myEmitter;