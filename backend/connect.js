module.exports = function(io) {
	io.on("connection", (socket) => {
		socket.on("register", (user) => {
			console.info(`User registered: {name: ${user.name}, id: ${user.id}}`)
		});
		socket.on("disconnect", ()=>{
			console.info(`User with ID: ${socket.id} has disconnected.`);
		});
		socket.on("message", (id, msg) => {
			console.log(id, msg);
			console.info(`Message sent to ${id}`);
			socket.to(id).emit(msg.type, msg.body);
		});
	});
};