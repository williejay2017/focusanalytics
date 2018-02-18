import React from 'react';
import { render } from 'react-dom';
import InfoBar from './InfoBar.js';

jest.mock('react-dom');

describe('Link', () => {
  test('should render correctly', () => {
    const wrapper = shallow(<InfoBar />);
  });
});
