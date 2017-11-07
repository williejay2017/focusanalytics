import React from 'react';
import {Line} from 'react-chartjs-2';
import moment from 'moment';
import './App.css';
require('twix'); 

class InteractionChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate,
            timeObject: props.timeObject,
            chartData: {},
            options: {
                title: {
                    display: true,
                    text: 'Number of User Interactions',
                    fontSize: 14,
                    fontColor: '#E87722',
                    fontFamily: 'Comic Sans MS'
                },
                scales: {
                    yAxes: [
                        {
                            ticks: {
                                beginAtZero: true,
                                fontColor: '#E87722',
                                fontFamily: 'Comic Sans MS'
                            }
                        }
                    ],
                    xAxes: [
                        {
                            ticks: {
                                fontColor: '#E87722',
                                fontFamily: 'Comic Sans MS',
                                fontSize: 11
                            }
                        }
                    ]
                },
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        fontColor: '#E87722',
                        fontFamily: 'Comic Sans MS'
                    }
                }
            },

         

        }
    }

     
    componentWillReceiveProps(nextProps) {
        this.chartScale(nextProps.data, nextProps.displayClicks, nextProps.displayPageVisits, nextProps.startDate);
    }
     
    chartScale(dataArray, clickProp, displayProp) {
        
        var dateDifference = moment(this.state.endDate).startOf('day').valueOf() - moment(this.state.startDate).startOf('day').valueOf();
        
        var timeDifference = moment(moment().startOf('day').valueOf() + this.state.timeObject.endTimeHour + this.state.timeObject.endTimeMin)  - 
                             moment(moment().startOf('day').valueOf() + this.state.timeObject.startTimeHour + this.state.timeObject.startTimeMin);
        
        if (dateDifference >= 2.678e+9) {   //Scale by month if difference is greater than 30 days.
            this.scale('Months', dataArray, clickProp, displayProp);
        }
        else if (dateDifference < 2.678e+9 && dateDifference >= 86390000) {   //Scale by days if difference is less than 30 days and greater than 24 hours.
            this.scale('Days', dataArray, clickProp, displayProp);
        }
        else if (timeDifference > 2.88e+7){
            this.scale('Hours', dataArray, clickProp, displayProp);    //Scale by hours if difference is less than 24 hours and greater than 8 hours.
        }
        else {
            this.scale('Half-Hours', dataArray, clickProp, displayProp);    //Scale by half-hour increments if difference is less than 8 hours.
        }
    }


    scale(scale, dataArray, clickProp, displayProp){
        var start = moment(moment().startOf('day').valueOf() + this.state.timeObject.startTimeHour + this.state.timeObject.startTimeMin);
        var end = moment(moment().startOf('day').valueOf() + this.state.timeObject.endTimeHour + this.state.timeObject.endTimeMin);
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
            iterate = moment.twix(moment(this.state.startDate).startOf('day').valueOf(), moment(this.state.endDate).startOf('day').valueOf()).iterate(scale);
        }
        if (scale === 'Months') {
            format = 'MMM';
            iterate = moment.twix(moment(this.state.startDate).startOf('day').valueOf(), moment(this.state.endDate).startOf('day').valueOf()).iterate(scale);
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
                    label: "Visits",
                    backgroundColor: 'rgba(255,255,255,0.5)',
                    borderColor: 'white',
                }, {
                    data: clickData,
                    label: "Clicks",
                    backgroundColor: 'rgba(0,255,0,0.1)',
                    borderColor: 'green',
					pointHoverBackgroundColor:'green'
                }]
        }
        //Update states with new graph data and options.
        this.setState({ chartData: newData });
        console.log(this.state.chartData);
    }

    render() {
        return (
            <div>
                <Line data={this.state.chartData} options={this.state.options} height={7} width={15}/>
            </div>
        );
    }

}

export default InteractionChart;