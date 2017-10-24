import React, {Component} from 'react';
import './App.css';
import './DataTracker.js';
import Utility from './Utility.js';
import moment from 'moment';
import Calendar from './Calendar.js';
import 'react-datepicker/dist/react-datepicker.css';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment()
    };
    this.calendarHandleChangeStart = this.calendarHandleChangeStart.bind(this);
    this.calendarHandleChangeEnd = this.calendarHandleChangeEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStartTimeValue = this.changeStartTimeValue.bind(this);
  }

  handleSubmit(event) {
    //Prevents refresh
    event.preventDefault();
    console.log("Submitted");
    //TODO
    Utility.getDates(this.state.startDate,this.state.endDate);
    this.retreiveData();
  }

  retreiveData(){
    Utility.getData();
  }

  calendarHandleChangeStart = (date) => {
   this.setState({startDate: date});
  }

  calendarHandleChangeEnd = (date) => {
    this.setState({endDate: date});
  }

  //unworking because time doesn't work
  changeStartTimeValue = (value) => {
    console.log(value.valueOf());
  }
  
  render() {
    return (
      <div className="Focus-App">
        <div id="sidenav" className="Focus-sidenav">

          <Calendar startDate={this.state.startDate} endDate={this.state.endDate} handleSubmit={this.handleSubmit}
            calendarHandleChangeStart={this.calendarHandleChangeStart} calendarHandleChangeEnd={this.calendarHandleChangeEnd}
            changeTimeValue = {this.changeStartTimeValue}/>


        </div>
      </div>
    );
  }
}

export default App;
