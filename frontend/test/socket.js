const io = require('socket.io-client');
const config = require('../backend.config');

var socket = io.connect(`${config.SERVER_ADDRESS}:${config.SERVER_PORT}`);

socket.on("opponent", function(opponent, room) {
  console.log("An oponent has been selected: ");
  console.log(`User: ${opponent.name}; ID: ${opponent.id}`);
  socket.emit("message", opponent.id, `Hi ${opponent.name}! Let's play.`);
});

socket.on("message", (msg) => {
  console.log(msg);
})

socket.on('connect', function(){
  const data = { name: "Emir Salazar", id: socket.id };
  console.log("Connection with server has been successful!");
  console.log(`User: ${data.name}; ID: ${data.id}`);
  socket.emit('register', data);
  console.log(`Waiting for oponent...`);
});


