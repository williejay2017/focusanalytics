import React from 'react';
import moment from 'moment';

class Table extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: props.data,
            avgVisitLength: 0,
            clicksPerDay: 0,
            visitsPerDay: 0
        }
    }

    componentWillReceiveProps(nextProps) {
  		this.handleData(nextProps.data);
  	}

    handleData(dataArray) {

      var visitLength = 0;
      var visitSum = 0;
      var clickSum = 0;
      var visitDateArray = [];
      var clickDateArray = [];
      for(var i = 0; i < dataArray.length; i++){
        if(dataArray[i].type=="visit"){
          visitLength+=dataArray[i].timeSpent;
          visitSum++;
          visitDateArray.push(dataArray[i].milliSeconds);
        }else if (dataArray[i].type=="click") {
          clickSum++;
          clickDateArray.push(dataArray[i].milliSeconds);
        }
        var avgVisit = visitLength/(visitSum*1000);
        visitDateArray.sort();
        clickDateArray.sort();
        var visitStart = new moment.duration(visitDateArray[0]);
        var visitEnd = new moment.duration(visitDateArray[visitDateArray.length-1]);
        var clickStart = new moment.duration(clickDateArray[0]);
        var clickEnd = new moment.duration(clickDateArray[clickDateArray.length-1]);
        visitStart = Math.trunc(visitStart.asDays());
        visitEnd = Math.trunc(visitEnd.asDays());
        clickStart = Math.trunc(clickStart.asDays());
        clickEnd = Math.trunc(clickEnd.asDays());

        var visitDays = visitEnd-visitStart+1;
        var clickDays = clickEnd-clickStart+1;
        var visitsPerDayTemp = visitSum/visitDays;
        var clicksPerDayTemp = clickSum/clickDays;
        this.setState(
          {
            avgVisitLength: Math.trunc(avgVisit),
            visitsPerDay: Math.trunc(visitsPerDayTemp),
            clicksPerDay: Math.trunc(clicksPerDayTemp)
          }
        );
      }

    }

    render(){
       return (
         <div className="overviewTable">
   				<h3>Overview Statistics</h3>
          <h4>Average clicks per day: {this.state.clicksPerDay}</h4>
          <h4>Average visits per day: {this.state.visitsPerDay}</h4>
          <h4>Average visit length: {this.state.avgVisitLength} seconds</h4>
   			</div>
        );
    }

}

export default Table;
