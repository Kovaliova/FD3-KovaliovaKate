import React from 'react';
import ReactDOM from 'react-dom';
import Filter from './components/Filter';

const words = [
  'california', 'everything', 'aboveboard', 'washington',
  'basketball', 'weathering', 'characters', 'literature',
  'contraband', 'appreciate'
];

ReactDOM.render(
  <div>
    <h1 style={{ textAlign: "center" }}>Фильтр</h1>
    <Filter items={words} />
  </div>,
  document.getElementById('container') 
);
