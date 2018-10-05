import { combineReducers } from 'redux';

import { gameReducer } from '../components/GameLayout/redux';

export default combineReducers({
  game: gameReducer,
})