import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import Loading from './Loading.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Loading renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Loading />);
  });
  it('Correctly renders the Loading Indicator', () => {
    expect(wrapper.exists('svg')).toBe(true);
  });
});
