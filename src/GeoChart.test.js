import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import GeoChart from './GeoChart.js';

Enzyme.configure({ adapter: new Adapter() });

describe('GeoChart renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<GeoChart />);
  });
  it('Correctly renders the Bar Chart', () => {
    expect(wrapper.find('Bar').exists()).toBe(true);
  });
});
