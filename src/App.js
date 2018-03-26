import React, { Component } from 'react';
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
import Loading from './Loading.js';
import InfoBar from './InfoBar.js';
import 'react-datepicker/dist/react-datepicker.css';
import ElementMapper from './ElementMapper.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      endDate: moment(),
      format: 'h:mm A',
      millisecondPerMin: 60000,
      millisecondPerHour: 3600000,
      heatMapData: [],
      version: 0,
      isLoading: false,
      dataVersion: 0,
      toggleHeat: true,
      displayClicks: true,
      displayPageVisits: true,
      chartTimeObject: Utility.getTimeObject(),
      value: false,
      text: 'Focus Analytics',
      NotAuthorized: true,
      canvasTimeout: false,
      password: "",
      emailID: ""


    };
    this.calendarHandleChangeStart = this.calendarHandleChangeStart.bind(this);
    this.calendarHandleChangeEnd = this.calendarHandleChangeEnd.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStartTimeValue = this.changeStartTimeValue.bind(this);
    this.handleAuthorization = this.handleAuthorization.bind(this);
    this.toggleHeatMap = this.toggleHeatMap.bind(this);
    this.displayClicks = this.displayClicks.bind(this);
    this.displayPageVisits = this.displayPageVisits.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.responseFacebook = this.responseFacebook.bind(this);
    this.handleResize = this.handleResize.bind(this);
    this.resizeContoller = this.resizeContoller.bind(this);
    this.responseGoogle = this.responseGoogle.bind(this);
  }

  timeObject = {
    startTime: 0,
    endTime: 0,
    startDate: 0,
    endDate: 0
  }

  componentDidMount = () => {
    this.setState({ toggleHeat: false, displayClicks: false, displayPageVisits: false , dataVersion : 1});
    window.addEventListener("resize", this.resizeContoller, false);
  }

  //Login methods\\
  handleEmailChange = (event) => {
    this.setState({ emailID: event.target.value });
  }

  handlePasswordChange = (event) => {
    this.setState({ password: event.target.value });
  }

  handleSignUp = (event) => {
    console.log("Sign up successful");
  }

  handleAuthorization = (event) => {
    event.preventDefault();
    this.setState({ isLoading: true });
    if (this.state.emailID === "" || this.state.password === "") {
      alert("Login Error: Invalid login or password");
      this.setState({ isLoading: false });
    } else {
      Utility.setLogin(this.state.emailID, this.state.password);
      Utility.getAuthorization(function (value, app) {
        try {
          app.setAuthorize(value);
        } catch (err) {
          console.error("Login Callback Failed: " + err);
        }
      }, this);
    }
  }

  setAuthorize = (response) => {
    //also maybe add a lockout after certain amount attemps)
    if (response === false) {
      this.setState({ NotAuthorized: true });
      this.setState({ isLoading: false });
      alert("Login Error: Invalid login or password");
    } else {
      this.setState({ NotAuthorized: false });
      this.setState({ isLoading: false });
    }
  }

  responseFacebook = (response) => {
    //need to add facebook username to our backend
    if(response.status !== 'not_authorized'){
       this.setState({NotAuthorized: false});
    }
    console.log(response);
}

  responseGoogle = (response) => {
    var id_token = response.getAuthResponse().id_token;
    console.log(response);
    console.log(response.profileObj.email);
    //anything else you want to do(save to localStorage)...
  }
  //-------------------\\


  handleSubmit = (event) => {
    //Prevents refresh
    event.preventDefault();
    this.setState({ isLoading: true });
    //Setting time and date values for query
    this.timeObject.startDate = this.state.startDate.startOf('day').valueOf();
    this.timeObject.endDate = this.state.endDate.startOf('day').valueOf();
    Utility.setDates(this.timeObject);
    ElementMapper.elemMapBuilder();
    this.dataHandler();
  }

  dataHandler = () => {
    Utility.getData(function (value, app) {
      try {
        app.setData(value);
      } catch (err) {
        console.error("Data Callback Error: " + err);
      }
    }, this);
  }




  setData = (data) => {
    var isData = data.length !== 0;
    this.setState({
      heatMapData: data,
      dataVersion: this.state.dataVersion + 1,
      toggleHeat: isData,
      displayClicks: isData,
      displayPageVisits: isData,
      isLoading: false
    });
  }

  displayClicks = (show) => {
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

  handleResize() {
		ElementMapper.elemMapBuilder();
    this.setState({ canvasTimeout : false,
                    dataVersion : this.state.dataVersion + 1 }); //forces re-draw of the heatmap canvas
    }

  resizeContoller() {

		if(!this.state.canvasTimeout){
			this.setState({ canvasTimeout : true });
      setTimeout(this.handleResize, 100); //Resizes once per second

		}

	}

  calendarHandleChangeStart = (date) => {
    this.setState({ startDate: date });
  }

  calendarHandleChangeEnd = (date) => {
    this.setState({ endDate: date });
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

    var loadClass = 'displayLoading';
    if (!this.state.isLoading) {
      loadClass = 'displayNone';
    }

    if (this.state.NotAuthorized) {
      return (
        <div className="Focus-App">
          <div id="sidenav" className="Focus-sidenav">
            <Login handleAuthorization={this.handleAuthorization} text={this.state.text}
              password={this.state.password} emailID={this.state.emailID} handleEmailChange={this.handleEmailChange}
              handlePasswordChange={this.handlePasswordChange} isLoading={this.state.isLoading} responseFacebook={this.responseFacebook}
              responseGoogle={this.responseGoogle} handleSignUp={this.handleSignUp} />
          </div>
        </div>
      );

    } else
      return (
        <div className="Focus-App">
          <div id="sidenav" className="Focus-sidenav">
            <div className={loadClass}>
              <Loading type='spin' color='#73AD21' height='100px' width='80px' />
            </div>
            <div className="topbar">
              <h1>[insert domain name]</h1>
            </div>
            <div className="uiTools">
            <h3>UI Tools</h3>
              <Calendar startDate={this.state.startDate} endDate={this.state.endDate} handleSubmit={this.handleSubmit}
                calendarHandleChangeStart={this.calendarHandleChangeStart} calendarHandleChangeEnd={this.calendarHandleChangeEnd}
                changeStartTimeValue={this.changeStartTimeValue} changeEndTimeValue={this.changeEndTimeValue} />
              <ControlPanel heatMapOn={this.state.toggleHeat} clicksOn={this.state.displayClicks} visitsOn={this.state.displayPageVisits}
                heatMapHandler={this.toggleHeatMap} clicksHandler={this.displayClicks} visitsHandler={this.displayPageVisits} />
            </div>
            <div className="summaryStatistics">
            <h3>Summary Statistics</h3>
                <InfoBar data={this.state.heatMapData} />
            </div>
            <div className="graphs">
            <InteractionChart data={this.state.heatMapData} displayClicks={this.state.displayClicks} displayPageVisits={this.state.displayPageVisits} timeObject={this.state.chartTimeObject}/>
            <br/>

            <GeoChart data={this.state.heatMapData} displayClicks={this.state.displayClicks} displayPageVisits={this.state.displayPageVisits} />

            </div>
          </div>

          <Heatmap data={this.state.heatMapData} display={this.state.toggleHeat}
            dataVersion={this.state.dataVersion} />

        </div>
      );
  }
}
/*
<div className="Focus-App">
  <div id="sidenav" className="Focus-sidenav">
    <div className={loadClass}>
      <Loading type='spin' color='#73AD21' height='100px' width='80px' />
    </div>
    <Calendar startDate={this.state.startDate} endDate={this.state.endDate} handleSubmit={this.handleSubmit}
      calendarHandleChangeStart={this.calendarHandleChangeStart} calendarHandleChangeEnd={this.calendarHandleChangeEnd}
      changeStartTimeValue={this.changeStartTimeValue} changeEndTimeValue={this.changeEndTimeValue} />

    <ControlPanel heatMapOn={this.state.toggleHeat} clicksOn={this.state.displayClicks} visitsOn={this.state.displayPageVisits}
      heatMapHandler={this.toggleHeatMap} clicksHandler={this.displayClicks} visitsHandler={this.displayPageVisits} />
    <br />
    <hr />
    <InfoBar data={this.state.heatMapData} />
    <hr />

    <InteractionChart data={this.state.heatMapData} displayClicks={this.state.displayClicks} displayPageVisits={this.state.displayPageVisits} timeObject={this.state.chartTimeObject}/>

    <GeoChart data={this.state.heatMapData} displayClicks={this.state.displayClicks} displayPageVisits={this.state.displayPageVisits} />

  </div>

  <Heatmap data={this.state.heatMapData} display={this.state.toggleHeat}
    dataVersion={this.state.dataVersion} />

</div>
*/

export default App;
