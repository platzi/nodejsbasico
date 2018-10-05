import React from 'react';
import BoardSquare from '../BoardSquare';
import "./BoardRow.css";

export default ({ value }) => (
  <div className="Board-Row">
  {
    value.map(({ key, value, symbol }) => (
      <BoardSquare
        key={key}
        coord={{ x: key[0], y: key[1] }}
        value={value}
        symbol={symbol}
      />
    ))
  }
  </div>
);
