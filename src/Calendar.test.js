import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import Calendar from './Calendar.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Calendar component renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Calendar />);
    wrapper.setState({NotAuthorized:true});
  });
  it('Correctly renders the date picker component', () => {
    expect(wrapper.find('Picker').exists()).toBe(true);
  });
});
