import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Radio, Button, Col, ControlLabel, FormControl } from 'react-bootstrap';
import { restartGame, selectGameType, setPlayers } from '../../../../redux/dispatchers';
import C from './constants';

class GameSetupPanel extends Component {
  constructor(props){
    super(props);
    this.state = { wasClicked: false }
  }

  onGameTypeClick = (e) => {
    this.props.selectGameType(e.currentTarget.value);
  }

  onPlayerNameChange = (playerID) => {
    return (e) => {
      const players = [...this.props.game.players];
      players[playerID].name = e.currentTarget.value;
      this.props.setPlayers(players);
    }
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.props.restartGame();
    this.setState({wasClicked: true});
  }

  validateFields = () => {
    const { game: {
      players,
      type
    }} = this.props;
    if (type !== null && !players.filter(player=>player.name === "").length) {
      return true;
    }
    if (type === C.NETWORK && players[0].name) return true;
    return false;
  }

  standAloneForm = () => (
    <React.Fragment>
      <FormGroup controlId="formPlayer1">
        <Col componentClass={ControlLabel} sm={2} md={4}>
          Jugador #1:
        </Col>
        <Col sm={10} md={8}>
          <FormControl
            type="text"
            placeholder="Introduzca su nombre"
            onChange={this.onPlayerNameChange(0)}
            value={this.props.game.players[0].name}
          />
        </Col> 
      </FormGroup>
      <FormGroup controlId="formPlayer2">
        <Col componentClass={ControlLabel} sm={2} md={4}>
          Jugador #2:
        </Col>
        <Col sm={10} md={8}>
          <FormControl
            type="text"
            placeholder="Introduzca su nombre"
            onChange={this.onPlayerNameChange(1)}
            value={this.props.game.players[1].name}
          />
        </Col>
      </FormGroup>
    </React.Fragment>
  )

  networkForm = () => (
    <React.Fragment>
      <FormGroup controlId="formPlayer1">
        <Col componentClass={ControlLabel} sm={2} md={4}>
          Jugador:
        </Col>
        <Col sm={10} md={8}>
          <FormControl
            type="text"
            placeholder="Introduzca su nombre"
            onChange={this.onPlayerNameChange(0)}
            value={this.props.game.players[0].name}
          />
        </Col> 
      </FormGroup>
    </React.Fragment>
  )

  render() {
    return (
      <React.Fragment>
        <form>
          <FormGroup controlId="formGameType">
            <Col componentClass={ControlLabel} sm={12}>
              Tipo de juego:
            </Col>
            <Col sm={12}>
              <FormGroup>
                <Radio
                  name="gameType"
                  value={C.STANDALONE}
                  onClick={this.onGameTypeClick}
                  selected={this.props.game.type === C.STANDALONE}
                  inline
                >
                  Standalone
                </Radio>{' '}
                <Radio
                  name="gameType"
                  value={C.NETWORK}
                  onClick={this.onGameTypeClick}
                  selected={this.props.game.type === C.NETWORK}
                  inline
                >
                  Network
                </Radio>{' '}
              </FormGroup>
            </Col>
          </FormGroup>
          {
            !this.props.game.type ?
              null :
              this.props.game.type === C.STANDALONE ?
                this.standAloneForm() :
                this.networkForm()
          }
          {
            this.validateFields() ?
            <Button type="submit" onClick={this.onSubmit}>Jugar</Button> :
            null
          }
        </form>
        {
          this.state.wasClicked && this.props.game.type === C.NETWORK ?
            <h3 style={{paddingTop: "10px"}}>
              Intentando conectar...
            </h3> : null
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = {
  restartGame,
  selectGameType,
  setPlayers,
}

export default {
  Title: "Configuración de juego",
  Body: connect(mapStateToProps, mapDispatchToProps)(GameSetupPanel),
}
