import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Calendar from './Calendar.js';
import Heatmap from './Heatmap.js';

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

