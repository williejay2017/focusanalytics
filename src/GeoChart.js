import React, { Component } from 'react';
import { Bar} from 'react-chartjs-2';
import './App.css';

class GeoChart extends Component {
	constructor(props) {
		super(props);
		this.state = {
			geoData: {},
			options: {
				title: {
					display: true,
					text: 'User Interactions by Region for Selected Dates',
					fontSize: 14,
					fontColor: '#1fad33',
					fontFamily: 'Helvetica Neue'
				},
				scales: {
					yAxes: [{
						ticks: {
							 beginAtZero: true,
						     fontColor: '#1fad33',
							 fontFamily: 'Helvetica Neue'
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            fontColor: '#1fad33',
							fontFamily: 'Helvetica Neue'
                        }
                    }]
				},
				legend: {
					display: true,
					position: 'bottom',
					labels: {
						fontColor: '#1fad33',
						fontFamily: 'Helvetica Neue'
					}
				},
			},
		}
	}

	componentWillReceiveProps(nextProps) {
		this.handleData(nextProps.data, nextProps.displayClicks, nextProps.displayPageVisits);
	}

	handleData(dataArray, clickProp, displayProp) {
		var clickData = new Array(10).fill(0);
		var visitData = new Array(10).fill(0);
		var labels = [];
		
		for (var i = 0; i < dataArray.length; i++) {

			var type = dataArray[i].type;

			//Adds data to correct graph (click or visit)
			//Dynammically adds regions based on what is recieved
			if (type === 'click') {
				if (!labels.includes(dataArray[i].region)) {
					labels.push(dataArray[i].region);
					clickData[labels.indexOf(dataArray[i].region)]++;
				}
				else {
					clickData[labels.indexOf(dataArray[i].region)]++;
				}
			}
			if (type === 'visit') {
				if (!labels.includes(dataArray[i].region)) {
					labels.push(dataArray[i].region);
					visitData[labels.indexOf(dataArray[i].region)]++;
				}
				else {
					visitData[labels.indexOf(dataArray[i].region)]++;
				}
			}
		}
		this.handleToggle(labels, clickData, visitData, clickProp, displayProp);
	}
	//Sets graph properties based on the data that it is given
	handleToggle(label, realClickData, realVisitData, clickProp, displayProp) {
		var clickData;
		var visitData;
				
		if (clickProp && displayProp) {

			clickData = realClickData;
			visitData = realVisitData;
		}
		if (clickProp && !displayProp) {

			clickData = realClickData;
			visitData = [0, 0, 0, 0, 0, 0];
		}
		if (!clickProp && displayProp) {

			clickData = [0, 0, 0, 0, 0, 0];
			visitData = realVisitData;
		}
		if (!clickProp && !displayProp) {

			clickData = [0, 0, 0, 0, 0, 0];
			visitData = [0, 0, 0, 0, 0, 0];
		}

		//Creates new graph property object
		var newData = {
			labels: label,
			datasets: [{
				data: visitData,
				label: "Page Visits",
				backgroundColor: 'rgba(255,255,255,0.5)',
				borderColor: 'white',
				hoverBackgroundColor: 'white',
				barThickness: 20
			}, {
				data: clickData,
				label: "User Clicks",
				backgroundColor: 'rgba(0, 255, 0, 0.2)',
				borderColor: 'green',
				hoverBackgroundColor: 'green'
			}]
		}
		//Use options to specify axes and scaling of graphs.
		var newOptions = { 
			title: {
				display: true,
				text: 'User Interactions by Region for Selected Dates',
				fontSize: 15
			},
			// responsive: true,
			tooltips: {
				mode: 'label'
			},
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
					}
				}],
				xAxes: [{
					labels: {
						show: true
					}
				}]
			},
		};
		this.setState({ geoData: newData });
		this.setState({ options: newOptions });
	}

	render() {
		return (
			<div>
				<Bar data={this.state.geoData} options={this.state.options} width={15} height={7} />
			</div>
		);
	}


}

export default GeoChart;