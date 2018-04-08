import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import ControlPanel from './ControlPanel.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Control Panel component renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ControlPanel />);
  });
  it('Correctly renders the three toggle switches', () => {
    expect(wrapper.find('ToggleSwitch').exists()).toBe(true);
  });
});
