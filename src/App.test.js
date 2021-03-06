import React from 'react';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';
import App from './App.js';
import Calendar from './Calendar.js';
import Heatmap from './Heatmap.js';



Enzyme.configure({ adapter: new Adapter() });

describe('Login page renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
    wrapper.setState({NotAuthorized:true});
  });
  it('Correctly renders the login component', () => {
    expect(wrapper.find('Login').exists()).toBe(true);
  });
});

describe('Main dashboard renders properly', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
    wrapper.setState({NotAuthorized:false});
  });
  it('renders calendar without crashing', () => {
    expect(wrapper.find('Calendar').exists()).toBe(true);
  });
  it('renders InfoBar without crashing', () => {
    expect(wrapper.find('InfoBar').exists()).toBe(true);
  });
  it('renders control panel without crashing', () => {
    expect(wrapper.find('ControlPanel').exists()).toBe(true);
  });
  it('renders interaction chart without crashing', () => {
    expect(wrapper.find('InteractionChart').exists()).toBe(true);
  });
  it('renders calendar without crashing', () => {
    expect(wrapper.find('GeoChart').exists()).toBe(true);
  });
  it('renders the loading indicator without crashing', () => {
    expect(wrapper.find('Loading').exists()).toBe(true);
  });
  it('renders the heatmap without crashing', () => {
    expect(wrapper.find('Heatmap').exists()).toBe(true);
  });
  it('does not render the login component', () => {
    expect(wrapper.find('Login').exists()).toBe(false);
  });
});
