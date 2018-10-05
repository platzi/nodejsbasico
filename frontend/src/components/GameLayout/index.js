import React from 'react';
import { connect } from 'react-redux';
import { Grid, Row, Col, Panel } from 'react-bootstrap';
import { Board, ContextPanel } from './components';
import "./GameLayout.css";

const GameLayout = (props) => (
  <Grid className="GameLayout">
    <Row>
      <Col xs={12} sm={12} md={10} mdOffset={1}>
        <Panel className="GameLayout-Board">
          <Panel.Heading>
            <div className="text-left">
              <h4>Tablero de juego</h4>
            </div>
          </Panel.Heading>
          <Panel.Body>
            <Board game={props.game}  />
          </Panel.Body>
        </Panel>
      </Col>
      <Col xs={12} sm={12} md={5} mdOffset={1} >
        <Panel className="GameLayout-Instructions">
          <Panel.Heading>
            <div className="text-left">
              <h4>Instrucciones de uso</h4>
            </div>
          </Panel.Heading>
          <Panel.Body>
            <div className="text-left">
              <p>Esta aplicación tiene dos modos de uso:</p>
              <ul>
                <li>
                  <p><b>Standalone</b>: le permite jugar con dos personas en una misma ventana.</p>
                </li>
                <li>
                  <p><b>Network</b>: le permite jugar entre distintas ventanas mediante conexión al servidor.</p>
                </li>
              </ul>
              <p>Para poder comenzar la partida, seleccione uno de los modos y complete la información sobre los jugadores solicitada.</p>
            </div>
          </Panel.Body>
        </Panel>
      </Col>
      <Col xs={12} md={5}>
        <ContextPanel className="GameLayout-Context"/>
      </Col>
    </Row>
  </Grid>
)

const mapStateToProps = ({ game }) => ({ game });

export default connect(mapStateToProps, null)(GameLayout);