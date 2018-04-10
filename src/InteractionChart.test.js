import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import InteractionChart from './InteractionChart.js';

Enzyme.configure({ adapter: new Adapter() });

describe('InteractionChart renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<InteractionChart />);
  });
  it('Correctly renders the Line Chart', () => {
    expect(wrapper.find('Line').exists()).toBe(true);
  });
});
