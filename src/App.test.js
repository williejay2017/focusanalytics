import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import Calendar from './Calendar.js';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('calendar renders', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Calendar />, div);
});
