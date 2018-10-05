const boardSquare = (key) => {
	return { key, value: -1, symbol: null }
}

const mapPlayer = ({ user, socket }, idx) => {
	return {
		name: user.name,
		id: socket.id,
		symbol: idx === 0 ? "X" : "O",
		isWinner: false,
	}
}

function initBoard() {
	return [
		{key: 0, value: [boardSquare('00'), boardSquare('01'), boardSquare('02')]},
		{key: 1, value: [boardSquare('10'), boardSquare('11'), boardSquare('12')]},
		{key: 2, value: [boardSquare('20'), boardSquare('21'), boardSquare('22')]},
	]
}

module.exports = {
	newGame: ({ players, roomId, playerId, opponentId }) => {
		const state = {
			players: players.map(mapPlayer),
			board: initBoard(),
			status: "ONGOING",
			currentPlayer: 0,
			noOfMoves: 0,
		}
		if (playerId !== null) state.playerId = playerId;
		if (opponentId !== null) state.opponentId = opponentId; 
		return state;
	}
};