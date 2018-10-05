import React, { Component } from 'react';
import cls from 'classnames';
import BoardRow from '../BoardRow/';
import { GAME_TYPE, GAME_STATE } from '../../redux/constants';
import './Board.css'

export default class Board extends Component {
  render() {
    const { game } = this.props;
    const classes = cls({
      Board: true,
      Board_Ongoing: 
        game.status === GAME_STATE.ONGOING,
      Board_OpponentTurn: 
        game.type === GAME_TYPE.NETWORK &&
        game.playerId !== game.currentPlayer
    }); 
    return (
      <div className={classes}>
        <div className="Board-Player">
          {
            
            game.status === GAME_STATE.ONGOING ?
              game.type === GAME_TYPE.STANDALONE ?
                <h3>{`Turno de ${game.players[game.currentPlayer].name}`}</h3> :
                game.playerId === game.currentPlayer ?
                  <h3>Es tu turno!</h3> :
                  <h3>Turno del oponente!</h3> :
              null
          }
        </div>
        {
          game.board.map(({key, value}, idx) => (
            <BoardRow key={key} value={value} />
          ))
        }
      </div>
    )
  }
}
