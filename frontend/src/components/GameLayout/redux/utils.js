import shuffle from 'shuffle-array';

export function shufflePlayers(players) {
  const shuffledPlayers = shuffle(players, { copy: true });
  shuffledPlayers[0].symbol = "X";
  shuffledPlayers[1].symbol = "O";
  return shuffledPlayers;
}

export function selectSquare({ board, players, currentPlayer }, { x, y }) {
  const newBoard = board.slice();
  newBoard[x].value[y].value = currentPlayer;
  newBoard[x].value[y].symbol = players[currentPlayer].symbol;
  return newBoard;
}

export function mapSimpleBoardArray(boardState) {
  return boardState.map(row=>row.value.map(col=>col.value));
}

function hasFinished(hasFinished, playerId) {
  return { hasFinished, playerId };
}

export function checkEndGame({ currentPlayer, noOfMoves, board }, coord ) {
  const simpleBoard = mapSimpleBoardArray(board),
        boardSize = board.length,
        x = Number(coord.x),
        y = Number(coord.y);

  //Check selected column
  for(let i = 0; i < boardSize; i+=1){
    if (simpleBoard[x][i] !== currentPlayer || simpleBoard[x][i] === -1) break;
    if (i === boardSize-1) {
      return hasFinished(true, currentPlayer);
    }
  }

  //Check selected column
  for(let i = 0; i < boardSize; i+=1){
    if (simpleBoard[i][y] !== currentPlayer || simpleBoard[i][y] === -1) break;
    if(i === boardSize-1){
      return hasFinished(true, currentPlayer);
    }
  }

  // Check main diag
  if(x === y){
    for(let i = 0; i < boardSize; i+=1){
      if(simpleBoard[i][i] !== currentPlayer || simpleBoard[i][i] === -1)
        break;
        if(i === boardSize-1){
          return hasFinished(true, currentPlayer);
      }
    }
  }

  // Check anti diag
  if(x + y === boardSize - 1){
    for(let i = 0; i < boardSize; i+=1){
      if(simpleBoard[i][(boardSize-1)-i] !== currentPlayer || simpleBoard[i][(boardSize-1)-i] === -1)
        break;
      if(i === boardSize-1){
        return hasFinished(true, currentPlayer);
      }
    }
  }

  // Check draw
  if(noOfMoves === Math.pow(boardSize, 2)) {
    return hasFinished(true, -1);
  }

  return hasFinished(false, null);
}