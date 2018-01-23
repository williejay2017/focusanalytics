import React, {Component} from 'react';
import './App.css';
import './DataTracker.js';
import Utility from './Utility.js';
import moment from 'moment';
import Calendar from './Calendar.js';
import Heatmap from './Heatmap.js';
import InteractionChart from './InteractionChart.js';
import GeoChart from './GeoChart.js';
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
      regionData : [],
      version: 0,
      dataVersion: 1,
      displayClicks: true,
      displayPageVisits: true,
      chartTimeObject: Utility.getTimeObject()
      
      
    };
    this.calendarHandleChangeStart = this.calendarHandleChangeStart.bind(this);
    this.calendarHandleChangeEnd = this.calendarHandleChangeEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStartTimeValue = this.changeStartTimeValue.bind(this);
  }

  timeObject = {
    startTime:0,
    endTime:0,
    startDate:0,
    endDate: 0
  }

  

  handleSubmit(event) {
    //Prevents refresh
    event.preventDefault();

    //Setting time and date values for query
    this.timeObject.startDate = this.state.startDate.startOf('day').valueOf();
    this.timeObject.endDate = this.state.endDate.startOf('day').valueOf();
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

  setData = (data) => {
    this.setState({heatMapData: data,
                   dataVersion: this.state.dataVersion + 1});
  }

  calendarHandleChangeStart = (date) => {
   this.setState({startDate: date});
  }

  calendarHandleChangeEnd = (date) => {
    this.setState({endDate: date});
  }
  
  changeStartTimeValue = (value) => {
    var millisecondPerMin = 60000;
    var millisecondPerHour = 3600000;
    this.timeObject.startTime = (value.hour() * millisecondPerHour) + (value.minute() * millisecondPerMin);
  }

  changeEndTimeValue = (value) => {
    var millisecondPerMin = 60000;
    var millisecondPerHour = 3600000;
    this.timeObject.endTime = (value.hour() * millisecondPerHour) + (value.minute() * millisecondPerMin);
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

          <InteractionChart data={this.state.heatMapData} displayClicks={this.state.displayClicks} displayPageVisits={this.state.displayPageVisits} timeObject={this.state.chartTimeObject}
          dataVersion = {this.state.dataVersion}/>   

          <GeoChart data={this.state.heatMapData} displayClicks={this.state.displayClicks} displayPageVisits={this.state.displayPageVisits} />

        </div>

       
         <Heatmap data={this.state.heatMapData}/>
      </div>
    );
  }
}

export default App;
