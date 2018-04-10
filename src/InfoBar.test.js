import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import InfoBar from './InfoBar.js';

Enzyme.configure({ adapter: new Adapter() });

describe('EmptyArray', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<InfoBar data={[]} />);
    wrapper.instance().handleData([]);
  });
  it('should calculate the correct averageTime for empty array', () => {
    expect(wrapper.state('data')[0].averageTime).toEqual('0 : 0 : 0');
  });

  it('should calculate the correct active time on page for empty array', () => {
    expect(wrapper.state('data')[0].activeUsage).toEqual('0 : 0 : 0');
  });

  it('should calculate the correct new users for empty array', () => {
    expect(wrapper.state('data')[0].newUser).toEqual(0);
  });

  it('should calculate the correct returning users for empty array', () => {
    expect(wrapper.state('data')[0].returningUser).toEqual(0);
  });

  it('should calculate the correct totalVisitsPerPeriod for empty json', () => {
    expect(wrapper.state('data')[0].totalVisitsPerPeiod).toEqual(0);
  });

});

describe('Array with one click', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<InfoBar data={[]} />);
    wrapper.instance().handleData([{"type":"visit","userType":"newUser","timeSpent":2059000,"engagement":2059000}]);
  });
  it('should calculate the correct averageTime for one click', () => {
    expect(wrapper.state('data')[0].averageTime).toEqual('0 : 34 : 19');
  });

  it('should calculate the correct active time on page for one click', () => {
    expect(wrapper.state('data')[0].activeUsage).toEqual('0 : 34 : 19');
  });

  it('should calculate the correct new users for one click', () => {
    expect(wrapper.state('data')[0].newUser).toEqual(1);
  });

  it('should calculate the correct returning users for one click', () => {
    expect(wrapper.state('data')[0].returningUser).toEqual(0);
  });

  it('should calculate the correct totalVisitsPerPeriod for one click', () => {
    expect(wrapper.state('data')[0].totalVisitsPerPeiod).toEqual(1);
  });
});

describe('Array with one multiple clicks', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<InfoBar data={[]} />);
    var click_array = [
      {"type":"visit","userType":"newUser","timeSpent":445000,"engagement":445000},
      {"type":"visit","userType":"newUser","timeSpent":3674000,"engagement":3674000},
      {"type":"visit","userType":"returningUser","timeSpent":123000,"engagement":123000}
    ]
    wrapper.instance().handleData(click_array);
  });
  it('should calculate the correct averageTime for one click', () => {
    expect(wrapper.state('data')[0].averageTime).toEqual('0 : 23 : 34');
  });

  it('should calculate the correct active time on page for one click', () => {
    expect(wrapper.state('data')[0].activeUsage).toEqual('0 : 23 : 34');
  });

  it('should calculate the correct new users for one click', () => {
    expect(wrapper.state('data')[0].newUser).toEqual(2);
  });

  it('should calculate the correct returning users for one click', () => {
    expect(wrapper.state('data')[0].returningUser).toEqual(1);
  });

  it('should calculate the correct totalVisitsPerPeriod for one click', () => {
    expect(wrapper.state('data')[0].totalVisitsPerPeiod).toEqual(3);
  });
});
