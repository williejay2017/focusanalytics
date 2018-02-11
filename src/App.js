import React, {Component} from 'react';
import './App.css';
import './DataTracker.js';
import Utility from './Utility.js';
import moment from 'moment';
import Calendar from './Calendar.js';
import Heatmap from './Heatmap.js';
import InteractionChart from './InteractionChart.js';
import GeoChart from './GeoChart.js';
import Login from './Login.js';
import ControlPanel from './ControlPanel.js';
import Table from './Table.js';
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
      toggleHeat: false,
      displayClicks: false,
      displayPageVisits: false,
      chartTimeObject: Utility.getTimeObject(),
      value: false,
      text: 'Focus Analytics',
      NotAuthorized: true


    };
    this.calendarHandleChangeStart = this.calendarHandleChangeStart.bind(this);
    this.calendarHandleChangeEnd = this.calendarHandleChangeEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStartTimeValue = this.changeStartTimeValue.bind(this);
    this.handleAuthorization = this.handleAuthorization.bind(this);
    this.toggleHeatMap = this.toggleHeatMap.bind(this);
		this.displayClicks = this.displayClicks.bind(this);
		this.displayPageVisits = this.displayPageVisits.bind(this);
  }

  timeObject = {
    startTime:0,
    endTime:0,
    startDate:0,
    endDate: 0
  }

  handleAuthorization(event) {
    event.preventDefault();
    //perform authorization here
  this.setState({NotAuthorized: false});

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

    var isData = data.length !== 0;
    this.setState({heatMapData: data,
                   dataVersion: this.state.dataVersion + 1,
                   toggleHeat: isData,
                   displayClicks: isData,
                   displayPageVisits: isData});
  }

  displayClicks(show) {
		if (!show || this.state.heatMapData.length !== 0) {
			this.setState({ displayClicks: show });
		}
		else {
			alert("No click data to display. Update date/time and click submit");
			this.setState({ displayClicks: false });
		}
  }

	displayPageVisits(show) {
		if (!show || this.state.heatMapData.length !== 0) {
			this.setState({ displayPageVisits: show });
		}
		else {
			alert("No page visit data to display. Update date/time and click submit");
			this.setState({ displayPageVisits: false });
		}
	}

	toggleHeatMap(show) {
		if (!show || this.state.heatMapData.length !== 0) {
			this.setState({ toggleHeat: show });
		}
		else {
			alert("No Heatmap data to display. Update date/time and click submit");
			this.setState({ toggleHeat: false });
		}
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

    if(this.state.NotAuthorized){
      return(
        <div className="Focus-App">
          <div id="sidenav" className="Focus-sidenav">
            <Login handleAuthorization={this.handleAuthorization} text={this.state.text}/>
          </div>
        </div>
      );

    }else

    return (
      <div className="Focus-App">
        <div id="sidenav" className="Focus-sidenav">

          <Calendar startDate={this.state.startDate} endDate={this.state.endDate} handleSubmit={this.handleSubmit}
            calendarHandleChangeStart={this.calendarHandleChangeStart} calendarHandleChangeEnd={this.calendarHandleChangeEnd}
            changeStartTimeValue = {this.changeStartTimeValue}  changeEndTimeValue = {this.changeEndTimeValue}/>

          <ControlPanel heatMapOn={this.state.toggleHeat} clicksOn={this.state.displayClicks} visitsOn={this.state.displayPageVisits}
						heatMapHandler={this.toggleHeatMap} clicksHandler={this.displayClicks} visitsHandler={this.displayPageVisits} />
          <br/>
          <br/>
          <br/>
          <hr/>
          <br/>

          <Table data={this.state.heatMapData}/>

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
