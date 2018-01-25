import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Calendar from './Calendar.js';
import Heatmap from './Heatmap.js';
// var data = [{x:2,y:4,value:2}];

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('calendar renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calendar />, div);
});

it('Heatmap Canvas Renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Heatmap />, div);
});

