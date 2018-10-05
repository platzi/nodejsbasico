import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import cls from 'classnames';
import './OnProgressMode.css';

class OnProgressMode extends Component {
  PlayerPanel(type, panelId, players, current, clientId, gameStatus) {
    const pnlClass = cls({
      current: current === panelId,
    });
    return (
      <Panel className={pnlClass} bsStyle="primary">
        <Panel.Body>
          <p className="OnProgressMode-Players-Label">
            {`Jugador #${ panelId + 1 }`}
          </p>
          <p className="OnProgressMode-Players-Name">
            { players[panelId].name }
          </p>
          {
            type === "NETWORK" && gameStatus === "ONGOING" ?
              <p className="OnProgressMode-Players-IsYou">
                {
                  panelId === clientId ?
                    "Tu" : "Oponente"
                }
              </p> :
              null
          }
        </Panel.Body>
      </Panel>
    );
  }

  GameData(noOfMoves) {
    return (
      <p className="text-center">{`Número de movimientos: ${noOfMoves}`}</p>
    );
  }

  render() {
    const {
      type,
      players,
      currentPlayer,
      noOfMoves,
      playerId,
      status
    } = this.props.game;
    return (
      <div className="OnProgressMode">
        <div className="OnProgressMode-Players">
          { this.PlayerPanel(type, 0, players, currentPlayer, playerId, status) }
          <span className="OnProgressMode-Players-Separator">VS</span>
          { this.PlayerPanel(type, 1, players, currentPlayer, playerId, status) }
        </div>
        { this.GameData(noOfMoves) }
      </div>
    );
  }
}

export default {
  Title: "Partida en progreso...",
  Body: OnProgressMode,
}