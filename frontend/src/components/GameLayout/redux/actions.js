import C from './constants';

export function actRestartGame() {
  return {
    type: C.GAME_RESTART
  }
}

export function actSelectGameType(payload) {
  return {
    type: C.SELECT_GAME_TYPE,
    payload
  }
}

export function actSetPlayers(payload) {
  return {
    type: C.SET_PLAYERS,
    payload
  }
}

export function actSelectBoardSquare(payload) {
  return {
    type: C.SELECT_BOARD_SQUARE,
    payload
  }
}

//***************
//Socket Actions
//***************

export function actSetGameState(payload) {
  return {
    type: C.SET_GAME_STATE,
    payload
  }
}

export function actRecieveMessage(payload) {
  return {
    type: C.RECEIVE_MESSAGE,
    payload
  }
}


