import ToggleButton from 'react-toggle-button';
import React, {Component} from 'react';

class ToggleSwitch extends Component {
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
					this.props.handler(!value);
				}}/>
			</div>
		);
	}

}
export default ToggleSwitch;