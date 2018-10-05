import { GAME_STATE } from './constants';

const boardSquare = (key) => {
  return { key, value: -1, symbol: null };
};

const player = () => {
  return {
    name: "",
    symbol: null,
  }
}

export function initBoard() {
  return [
    {key: 0, value: [boardSquare('00'), boardSquare('01'), boardSquare('02')] },
    {key: 1, value: [boardSquare('10'), boardSquare('11'), boardSquare('12')] },
    {key: 2, value: [boardSquare('20'), boardSquare('21'), boardSquare('22')] },
  ];
}

export default {
  board: initBoard(),
  type: null,    // Can be "standalone" or "network"
  players: [
    player(),
    player()
  ],
  status: GAME_STATE.ON_SETUP,
  currentPlayer: null, // Can be 0, 1 or null for initial state,
  noOfMoves: 0,
  winnerId: null,
}