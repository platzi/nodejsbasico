import Socket from '../components/Socket';
import {
  actRestartGame,
  actSelectGameType,
  actSetPlayers,
  actSelectBoardSquare,
  actSetGameState,
  actRecieveMessage
} from './actions';
import { GAME_TYPE, GAME_STATE } from './constants';

export function restartGame() {
  return (dispatch, getState) => {
    const { game } = getState();
    if (game.type === GAME_TYPE.STANDALONE) {
      dispatch(actRestartGame());
    } 
    if (game.type === GAME_TYPE.NETWORK) {
      if (game.status === GAME_STATE.FINISHED) {
        Socket.stop();
        Socket.start();
        dispatch(actRestartGame());
      } else {
        if (!Socket.instance()){
          Socket.start();
          Socket.instance().on("connect", ()=>{
            Socket.instance().emit("register", { name: game.players[0].name, id: Socket.instance().id });
            Socket.instance().on("playerTurn", (payload)=>{
              dispatch(actRecieveMessage(payload));
            });
            Socket.instance().on("gameState", (payload)=>{
              dispatch(actSetGameState(payload));
            });
            dispatch(actRestartGame());
          });
        }
      }
    }
  }
}

export function selectGameType(payload) {
  return (dispatch, getState) => {
    dispatch(actSelectGameType(payload))
  }
}

export function setPlayers(payload) {
  return (dispatch, getState) => {
    dispatch(actSetPlayers(payload))
  }
}

export function selectBoardSquare(payload) {
  return (dispatch, getState) => {
    const { game } = getState();
    if (game.type === GAME_TYPE.STANDALONE) {
      dispatch(actSelectBoardSquare(payload))
    }
    if (game.type === GAME_TYPE.NETWORK) {
      if (Socket.instance()) {
        dispatch(actSelectBoardSquare(payload))
        Socket.instance().emit("message", game.players[game.opponentId].id , { type: "playerTurn", body: getState().game });
      }
    }
  }
}