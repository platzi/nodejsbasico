import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { restartGame } from '../../../../redux/dispatchers';
import { GAME_STATE, GAME_TYPE } from '../../../../redux/constants';

class OnCompletedMode extends Component {
  onSubmit = (e) => {
    e.preventDefault();
    this.props.restartGame();
  }

  render() {
    const { game } = this.props;
    return (
      <form>
        <div>Fin del juego</div>
        <div className="ContextPanel-Result">
          {
            game.status === GAME_STATE.FINISHED ?
              !isNaN(game.winnerId) && game.winnerId !== -1 ?
                <span>{`${game.players[game.winnerId].name} ha ganado!`}</span> :
                <span>{`El juego ha concluido en empate!`}</span> :
              null
          }
        </div>
        {
          game.type === GAME_TYPE.NETWORK && game.status === GAME_STATE.FINISHED ?
            null :
            <Button type="submit" onClick={this.onSubmit}>Jugar</Button>
        }
      </form>
    );
  }
}

export default {
  Title: "Fin de la partida",
  Body: connect(null, { restartGame })(OnCompletedMode),
}