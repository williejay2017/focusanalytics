import React from 'react';

class Legend extends React.Component {
    constructor(props) { 
        super(props); 
        this.state = {
            max: props.maxValue
        };
    }

   componentWillReceiveProps(nextProps) {
        this.setState({max: nextProps.maxValue});
    }

    render() {
            var blueLable = "0 - " + Math.ceil((this.state.max * .25));
            var greenLable = Math.ceil((this.state.max * .25)) + " - " + Math.ceil((this.state.max * .55));
            var yellowLable = Math.ceil((this.state.max * .55)) + " - " + Math.ceil((this.state.max * .85));
            var redLable = Math.ceil((this.state.max * .85)) + " - " + this.state.max;
       return (
            <div className="legend">
                <h3>Heatmap Click Legend</h3>
                <div>
                     <h5>{blueLable}</h5>
                     <h5>{greenLable}</h5>
                     <h5>{yellowLable}</h5>
                     <h5>{redLable}</h5>
                </div>
                <div className="legend-bar">
                    <div className="color-box" style={{ backgroundColor: 'blue' }} ></div>
                    <div className="color-box" style={{ backgroundColor: 'lightgreen' }}></div>
                    <div className="color-box" style={{ backgroundColor: 'yellow' }}></div>
                    <div className="color-box" style={{ backgroundColor: 'red' }}></div>
                </div>

            </div>
        );
    }
}
export default Legend;