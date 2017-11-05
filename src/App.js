import React, {Component} from 'react';
import './App.css';
import './DataTracker.js';
import Utility from './Utility.js';
import moment from 'moment';
import Calendar from './Calendar.js';
// import Heatmap from './Heatmap.js';
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
      version: 0,
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
    this.dataHandler();
  }

  dataHandler() {
    Utility.getData(function(value, app){
      try{
          app.setData(value);
         }catch(err){
          console.error("Data Callback Error: " + err);
      }
    },this);
  }

  setData(data){

    var filterData = Utility.processData(data);
    //set the rest, react will render based on values passed into props
    this.setState({heatMapData: filterData.heatMapData});
    
  }

  calendarHandleChangeStart = (date) => {
   this.setState({startDate: date});
  }

  calendarHandleChangeEnd = (date) => {
    this.setState({endDate: date});
  }
  
  changeStartTimeValue = (value) => {
    this.timeObject.startTime = value.valueOf();
  }

  changeEndTimeValue = (value) => {
    this.timeObject.endTime = value.valueOf();
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
        {/* <Heatmap data={this.state.heatMapData} dataVersion={this.state.dataVersion}/> */}
      </div>
    );
  }
}

export default App;
