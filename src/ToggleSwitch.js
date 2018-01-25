import ToggleButton from 'react-toggle-button';
import React from 'react';

class ToggleSwitch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: props.value,
			text: props.text
		}
	}

	componentWillReceiveProps(nextProps){
		this.setState({value: nextProps.value});
	}

	render() {
		return (
			<div className="toggleSwitch">
				<h4>{this.state.text}</h4>
				<ToggleButton value={ this.state.value } onToggle={(value) => {
					this.setState({value: !value});
				}}/>
			</div>
		);
	}

}
export default ToggleSwitch;