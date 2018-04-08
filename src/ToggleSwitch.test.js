import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import ToggleSwitch from './ToggleSwitch.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Toggle switch renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ToggleSwitch />);
    console.log(wrapper.html());
  });
  it('Correctly renders the heatmap', () => {
    expect(wrapper.hasClass('.toggleSwitch')).toBe(true);
  });
});
