import React from 'react';
import { connect } from 'react-redux';
import { Panel } from 'react-bootstrap';
import { OnSetupMode, OnProgressMode, OnCompletedMode } from './components';
import { GAME_STATE } from '../../redux/constants';
import "./ContextPanel.css";

const getByContext = (status) => {
  if (status === GAME_STATE.ON_SETUP) return OnSetupMode;
  if (status === GAME_STATE.ONGOING || status === GAME_STATE.MATCHING) return OnProgressMode;
  return OnCompletedMode;
}

const ContextPanel = ({ game, className }) => {
  const Content = getByContext(game.status);
  return (
    <Panel className={ className }>
      <Panel.Heading>
        <Panel.Title>
          <div className="text-left">
            <h4>{ Content.Title }</h4>
          </div>
        </Panel.Title>
      </Panel.Heading>
      <Panel.Body>
        <Content.Body game={game}/>
        {
          game.status === GAME_STATE.MATCHING ?
            <h3 className="text-center">
              Emparejando...
            </h3> :
            null
        }
      </Panel.Body>
    </Panel>
  );
}

const mapStateToProps = ({
  game
}) => ({
  game
});

export default connect(mapStateToProps, null)(ContextPanel);