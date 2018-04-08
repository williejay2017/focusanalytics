import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import Heatmap from './Heatmap.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Heatmap renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Heatmap />);
  });
  it('Correctly renders the heatmap', () => {
    expect(wrapper.find('ReactHeatmap').exists()).toBe(true);
  });
});
