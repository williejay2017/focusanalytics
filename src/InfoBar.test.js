import React from 'react';
import sinon from 'sinon';
import { mount } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

import InfoBar from './InfoBar.js';

Enzyme.configure({ adapter: new Adapter() });

describe('CalculateAverageActiveTime', () => {

  it('should calculate the correct average wait time for empty json', () => {
    const wrapper = mount(<InfoBar data={[{"type":"visit","userType":"newUser","totalTimeSpent":"0"}]} />);
  });

});
