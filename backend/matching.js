const { newGame } = require("./gameState");

module.exports = () => {
	let players = {},
		onWait = [],
		onMatch = {};

	const loop = setInterval(checkQueue, 5000);

	function printListStatus() {
		console.info(`Queues:{ Players: ${Object.keys(players).length}, Onwait: ${onWait.length}; OnMatch: ${Object.keys(onMatch).length}; }`)
	}

	function checkQueue() {
		printListStatus();
		while (onWait.length >= 2) {
			console.log("Constructing room...");
			constructRoom(onWait.pop(), onWait.pop());
		}
	}

	function constructRoom(pOneID, pTwoID) {
		const roomID = pOneID + pTwoID;
		players[pOneID].roomID = roomID;
		players[pTwoID].roomID = roomID;
		console.log(`Room created for ${pOneID} and ${pTwoID}`);
		
		if (!onMatch[roomID]) onMatch[roomID] = newGame({
			players: [players[pOneID], players[pTwoID]],
			roomID,
		});
		players[pOneID].socket.emit("gameState", newGame({
			players: [players[pOneID], players[pTwoID]],
			roomID,
			playerId: 0,
			opponentId: 1,
		}));
		players[pTwoID].socket.emit("gameState", newGame({
			players: [players[pOneID], players[pTwoID]],
			roomID,
			playerId: 1,
			opponentId: 0,
		}));
	}
	
	return {
		// user: {socket, user}
		userConnect: ({ socket, user }) => {
			if (!players[socket.id]) {
				// Add to player list
				players[socket.id] = { user, socket };
				// Add to waiting list
				onWait.push(socket.id);
			}
		},
		clear: () => clearInterval(loop),
		userDisconnect: (id) => {
			// Close ongoing game related to player if any
			console.log("On disconnect", id);
			if (players[id].roomID && onMatch[players[id].roomID]) {
				const roomID = players[id].roomID;
				// Put all players back on onWait
				onMatch[roomID].players.map(player => onWait.push(player.id));
				// Delete match room
				delete onMatch[players[id].roomID];
				// If the object gets deleted, reset it
				if (!onMatch) onMatch = {};
			}
			// Delete all instances of disconnecting player from waiting list (if any)
			onWait = onWait.filter(el => el !== id);
			// Delete from players list
			if (players[id]) {
				delete players[id];
				if (!players) players = {};
			}
		},
	}
};