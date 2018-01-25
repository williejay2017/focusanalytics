import React, { Component } from 'react';
import ToggleSwitch from './ToggleSwitch';

class ControlPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			heatMapOn: props.heatMapOn,
			clicksOn: props.clicksOn,
			visitsOn: props.visitsOn,
			hover: false
		}
	
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ heatMapOn: nextProps.heatMapOn })
		this.setState({ clicksOn: nextProps.clicksOn });
		this.setState({ visitsOn: nextProps.visitsOn });
	}

	render() {
	
		return (
			<div className="controlPanel">
				<h3>Display Options</h3>

				<ToggleSwitch value={this.state.heatMapOn} text="Toggle Heatmap" handler={this.props.heatMapHandler} />

				<ToggleSwitch value={this.state.clicksOn} text="Toggle Click Graphs" handler={this.props.clicksHandler} />

				<ToggleSwitch value={this.state.visitsOn} text="Toggle Visit Graphs" handler={this.props.visitsHandler} />


			</div>
		);
	}
}

export default ControlPanel;
