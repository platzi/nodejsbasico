//import R from 'ramda'
import { default as C, GAME_STATE, GAME_TYPE } from './constants';
import initialState, { initBoard } from './initialState';
import {
  shufflePlayers,
  selectSquare,
  checkEndGame,
} from './utils';

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case C.SET_PLAYERS:
      return { ...state, players: payload}
    case C.SELECT_GAME_TYPE:
      return { ...state, type: payload }
    case C.SELECT_BOARD_SQUARE:
      const newBoard = selectSquare(state, payload);
      const newState = {
        ...state,
        board: newBoard,
        noOfMoves: state.noOfMoves + 1
      };
      const checkIf = checkEndGame(newState, payload);
      newState.status = !checkIf.hasFinished ?
        GAME_STATE.ONGOING :
        GAME_STATE.FINISHED;
      if (newState.status === GAME_STATE.ONGOING) {
        newState.currentPlayer = state.currentPlayer === 0 ? 1 : 0;
      }
      if (newState.status === GAME_STATE.FINISHED) {
        newState.winnerId = checkIf.playerId;
      }
      return newState;
    case C.GAME_RESTART:
      return {
        ...state,
        board: initBoard(),
        players: shufflePlayers(state.players),
        status: state.type === GAME_TYPE.NETWORK ?
          GAME_STATE.MATCHING :
          GAME_STATE.ONGOING,
        currentPlayer: 0,
        noOfMoves: 0,
        winnerId: null,
      };
    case C.SET_GAME_STATE:
      return { ...state, ...payload }
    case C.RECEIVE_MESSAGE:
      return { ...state, ...payload, opponentId: state.opponentId, playerId: state.playerId }
    default:
      return state
  }
}
