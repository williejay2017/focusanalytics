import React from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import './App.css';
require('twix'); 

class InteractionChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timeObject: props.timeObject,
            chartData: {},
            options: { 
                title: {
                    display: true,
                    text: 'Interactions By Dates',
                    fontSize: 20,
                    fontColor: '#FFFFFF',
                    fontFamily: 'Trench'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: '#FFFFFF',
                            fontFamily: 'Trench'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#FFFFFF',
                            fontFamily: 'Trench',
                            fontSize: 11
                        }
                    }]
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                    fontColor: '#FFFFFF',
                    fontFamily: 'Trench',
                    fontSize: 15
                    }
                }
            }
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.chartScale(nextProps.data, nextProps.displayClicks, nextProps.displayPageVisits);
        
    }


    chartScale(dataArray, clickProp, displayProp) {
        
        
        var dateDifference = this.state.timeObject.endDate - this.state.timeObject.startDate;

        var timeDifference = moment(moment().startOf('day').valueOf() + this.state.timeObject.endTime)  - 
                             moment(moment().startOf('day').valueOf() + this.state.timeObject.startTime);
       
        
        if (dateDifference >= 2.678e+9) {  
            this.scale('Months', dataArray, clickProp, displayProp);
           
        }
        else if (dateDifference <= 2.678e+9 && dateDifference >= 86390000) {   
            this.scale('Days', dataArray, clickProp, displayProp);
        }
        else if (timeDifference > 2.88e+7 && timeDifference < 8.64e+7){
            this.scale('Hours', dataArray, clickProp, displayProp);    
        }
        else if (timeDifference < 2.88e+7){
            this.scale('Half-Hours', dataArray, clickProp, displayProp);    
        }
    }
     scale(scale, dataArray, clickProp, displayProp){

        var start = moment(moment().startOf('day').valueOf() + this.state.timeObject.startTime);
        var end = moment(moment().startOf('day').valueOf() + this.state.timeObject.endTime);
        var clickData;
        var visitData;
        var format;
        var iterate;
        var labels = [];
        var type;
        var i;
        
        if (scale === 'Half-Hours') {
            format = 'h:mmA';
            iterate = start.twix(end).iterate(30, 'minutes', 0);
        }
        if (scale === 'Hours') {
            format = 'hA';
            iterate = moment.twix(start, end).iterate(scale);
        }
        if (scale === 'Days') {
            format = 'M/D';
            iterate = moment.twix(moment(this.state.timeObject.startDate).startOf('day').valueOf(), moment(this.state.timeObject.endDate).startOf('day').valueOf()).iterate(scale);
        }
        if (scale === 'Months') {
            format = 'MMM';
            iterate = moment.twix(moment(this.state.timeObject.startDate).startOf('day').valueOf(), moment(this.state.timeObject.endDate).startOf('day').valueOf()).iterate(scale);
        }

        //Add labels to graph.
        while (iterate.hasNext()) {
            labels.push(iterate.next().format(format))
        }

        clickData = new Array(labels.length).fill(0);
        visitData = new Array(labels.length).fill(0);

        if (scale === 'Half-Hours') {

            for (i = 0; i < dataArray.length; i++) {
                let time = dataArray[i].milliSeconds;
                let date = new Date(time);
                var coeff = 1000 * 60 * 30;
                var rounded = new Date(Math.round(date.getTime() / coeff) * coeff);
                let x_axis = moment(rounded).format(format);
                type = dataArray[i].type;

                if (type === 'click') {
                    clickData[labels.indexOf(x_axis)] += 1;
                }
                if (type === 'visit') {
                    visitData[labels.indexOf(x_axis)] += 1;
                }
            }   

        } else {

            for (i = 0; i < dataArray.length; i++) {
                let time = dataArray[i].milliSeconds;
                let date = new Date(time);
                let x_axis = moment(date).format(format);

                type = dataArray[i].type;

                if (type === 'click') {
                    clickData[labels.indexOf(x_axis)] += 1;

                }
                if (type === 'visit') {
                    visitData[labels.indexOf(x_axis)] += 1;
                }
            }
        }
        this.handleToggle(scale.slice(0, -1), labels, clickData, visitData, clickProp, displayProp);
    }

    //Toggle buttons to toggle on/off page visits and number of clicks.
    handleToggle(scale, labels, realClickData, realVisitData, clickProp, displayProp) {
        var newData;
        var clickData;
        var visitData;
       

        if (clickProp && displayProp) {

            clickData = realClickData;
            visitData = realVisitData;
        }
        if (clickProp && !displayProp) {

            clickData = realClickData;
            visitData = [];
        }
        if (!clickProp && displayProp) {

            clickData = [];
            visitData = realVisitData;
        }
        if (!clickProp && !displayProp) {

            clickData = [];
            visitData = [];
        }

        //Creates new graph property object.
        newData = {
            labels: labels,
            datasets: [
                {
                    data: visitData,
                    label: "Page Visits",
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderColor: 'white',
                }, {
                    data: clickData,
                    label: "User Clicks",
                    backgroundColor: 'rgba(0,255,0,0.1)',
                    borderColor: 'green',
					pointHoverBackgroundColor:'green'
                }]
        }
        //Update states with new graph data and options.
        this.setState({ chartData: newData });
    }

    render() {
        return (
            <div className ="Ichart">
                <Line data={this.state.chartData} options={this.state.options} height={7} width={15}/>
            </div>
        );
    }

}

export default InteractionChart;