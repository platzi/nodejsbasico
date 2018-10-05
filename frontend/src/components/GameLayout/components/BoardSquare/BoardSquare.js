import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBoardSquare } from '../../redux/dispatchers';
import { GAME_STATE, GAME_TYPE } from '../../redux/constants';
import cls from 'classnames';
import "./BoardSquare.css";

class BoardSquare extends Component {
  onBoardSquareClick = coord => {
    return e => {
      const {
        game
      } = this.props;
      if (game.status !== GAME_STATE.ONGOING) return;
      if (game.type === GAME_TYPE.STANDALONE) {
        if (game.board[coord.x].value[coord.y].value === -1) {
          this.props.selectBoardSquare(coord);
        }
      }
      if (game.type === GAME_TYPE.NETWORK) {
        if (
          game.board[coord.x].value[coord.y].value === -1 &&
          game.playerId === game.currentPlayer
        ) {
          this.props.selectBoardSquare(coord);
        }
      }
    }
  }

  setDisplay = (value) => {
    if (value !== -1) { return value }
    return null
  }

  render() {
    const { coord, symbol } = this.props;
    const classes = cls({
      'Board-Square': true,
      'isX': symbol === "X",
      'isO': symbol === "O"
    })
    return (
      <div className={classes} onClick={this.onBoardSquareClick(coord)}>
        { symbol }
      </div>
    );
  }
}

const mapStateToProps = ({ game }) => ({ game });

const mapDispatchToProps = {
  selectBoardSquare
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSquare);
