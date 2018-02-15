import React from 'react';
import { render } from 'react-dom';
import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import InfoBar from './InfoBar.js';

jest.mock('react-dom');

describe('Link', () => {
  it('should render correctly', () => {
    configure({ adapter: new Adapter() });
    const wrapper = shallow(<InfoBar />);
  });
});
