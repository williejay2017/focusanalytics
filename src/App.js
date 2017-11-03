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
      endDate: moment(),
      format:'h:mm A',
      millisecondPerMin: 60000,
      millisecondPerHour: 3600000,
      heatMapData : [],
      processData: [],
      dataVersion: 0
      
    };
    this.calendarHandleChangeStart = this.calendarHandleChangeStart.bind(this);
    this.calendarHandleChangeEnd = this.calendarHandleChangeEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStartTimeValue = this.changeStartTimeValue.bind(this);
  }

  timeObject = {
    startTime:0,
    endTime:0, 
    startDay:0,
    endDay:0
  }

  

  handleSubmit(event) {
    //Prevents refresh
    event.preventDefault();

    //Setting time and date values for query
    this.timeObject.startDay = this.state.startDate.startOf('day').valueOf();
    this.timeObject.endDay = this.state.endDate.startOf('day').valueOf();
    Utility.setDates(this.timeObject);
    this.retreiveData();
  }

  retreiveData() {
    Utility.getData(function(value, app){
      try{
          app.setState({
             heatMapData: value.data, 
             dataVersion: app.state.dataVersion + 1
           });
          console.log(value);
          
        }catch(err){
        console.error("Data Callback Error: " + err);
      }
    },this);
  }

  

  calendarHandleChangeStart = (date) => {
   this.setState({startDate: date});
  }

  calendarHandleChangeEnd = (date) => {
    this.setState({endDate: date});
  }
  
  changeStartTimeValue = (value) => {
    
        var parseTime = value.format(this.state.format);
        var seperators = [":", " "];
        var splitTest = parseTime.split(new RegExp(seperators.join('|'), 'g'));
        var addedMinutes = parseInt(splitTest[1], 10) * this.state.millisecondPerMin;
        var addHours;

        if (splitTest[2] === 'AM' && splitTest[0] !== '12') {
            addHours = parseInt(splitTest[0], 10) * this.state.millisecondPerHour;
        } else if (splitTest[2] === 'PM' && splitTest[0] !== '12') {
            var tempArray = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            var position = tempArray[parseInt(splitTest[0], 10)];
            addHours = position * this.state.millisecondPerHour;
        } else if (splitTest[2] === 'PM' && splitTest[0] === '12') {
            addHours = 12 * this.state.millisecondPerHour;
        } else if (splitTest[2] === 'AM' && splitTest[0] === '12') {
            addHours = 0 * this.state.millisecondPerHour;
        }
        
        this.timeObject.startTime = addHours + addedMinutes;
  }

  changeEndTimeValue = (value) => {
    var parseTime = value.format(this.state.format);
        var seperators = [":", " "];
        var splitTest = parseTime.split(new RegExp(seperators.join('|'), 'g'));
        var addedMinutes = parseInt(splitTest[1], 10) * this.state.millisecondPerMin;
        var addHours;

        if (splitTest[2] === 'AM' && splitTest[0] !== '12') {
            addHours = parseInt(splitTest[0], 10) * this.state.millisecondPerHour;
        } else if (splitTest[2] === 'PM' && splitTest[0] !== '12') {
            var tempArray = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            var position = tempArray[parseInt(splitTest[0], 10)];
            addHours = position * this.state.millisecondPerHour;
        } else if (splitTest[2] === 'PM' && splitTest[0] === '12') {
            addHours = 12 * this.state.millisecondPerHour;
        } else if (splitTest[2] === 'AM' && splitTest[0] === '12') {
            addHours = 0 * this.state.millisecondPerHour;
        }
        
        this.timeObject.endTime = addHours + addedMinutes;

  }

  render() {
    return (
      <div className="Focus-App">
        <div id="sidenav" className="Focus-sidenav">

          <Calendar startDate={this.state.startDate} endDate={this.state.endDate} handleSubmit={this.handleSubmit}
            calendarHandleChangeStart={this.calendarHandleChangeStart} calendarHandleChangeEnd={this.calendarHandleChangeEnd}
            changeStartTimeValue = {this.changeStartTimeValue}  changeEndTimeValue = {this.changeEndTimeValue}/>
          <br/>
          <hr/>

        </div>
      </div>
    );
  }
}

export default App;
