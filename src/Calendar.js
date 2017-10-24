import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            startDate: props.startDate,
            endDate: props.endDate,
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            startDate: nextProps.startDate,
            endDate: nextProps.endDate
        });
    }

    currentMoment = moment().hour(0).minute(0);

    format = 'h:mm A';

    millisecondPerMin = 60000;
			
    millisecondPerHour = 3600000;


    getStartTimeValue(value) {

        var parseTime = value.format(this.format);
        var seperators = [":", " "];
        var splitTest = parseTime.split(new RegExp(seperators.join('|'), 'g'));
        var addedMinutes = parseInt(splitTest[1], 10) * this.millisecondPerMin;
        var addHours;

        if (splitTest[2] === 'AM' && splitTest[0] !== '12') {
            addHours = parseInt(splitTest[0], 10) * this.millisecondPerHour;
        } else if (splitTest[2] === 'PM' && splitTest[0] !== '12') {
            var tempArray = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
            var position = tempArray[parseInt(splitTest[0], 10)];
            addHours = position * this.millisecondPerHour;
        } else if (splitTest[2] === 'PM' && splitTest[0] === '12') {
            addHours = 12 * this.millisecondPerHour;
        } else if (splitTest[2] === 'AM' && splitTest[0] === '12') {
            addHours = 0 * this.millisecondPerHour;
        }
        console.log(addHours + addedMinutes);
        //TODO something with add hours and add minutes
    }


    getEndTimeValue(value) {

		var parseTime = value.format(this.format);
		var seperators = [":", " "];
		var splitTest = parseTime.split(new RegExp(seperators.join('|'), 'g'));
		var addedMinutes = parseInt(splitTest[1], 10) * this.millisecondPerMin;
		var addHours;

		if (splitTest[2] === 'AM' && splitTest[0] !== '12') {
			addHours = parseInt(splitTest[0], 10) * this.millisecondPerHour;
		} else if (splitTest[2] === 'PM' && splitTest[0] !== '12') {
			var tempArray = [0, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
			var position = tempArray[parseInt(splitTest[0], 10)];
			addHours = position * this.millisecondPerHour;
		} else if (splitTest[2] === 'PM' && splitTest[0] === '12') {
			addHours = 12 * this.millisecondPerHour;
		} else if (splitTest[2] === 'AM' && splitTest[0] === '12') {
			addHours = 0 * this.millisecondPerHour;
		}
        
        //TODO
	}

    render(){
        return(
            <form className="dateContainer" id='dateContainer' onSubmit={this.props.handleSubmit}>
                <div>
                    <div className="dateLabel">
                        <h3>Start Date</h3>
                        <DatePicker
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.props.calendarHandleChangeStart}

                        />
                        <br></br>
                         {/* <TimePicker disabledMinutes={this.disableMinutes} defaultValue={this.currentMoment} 
                            onChange={this.props.changeTimeValue} format={this.format} allowEmpty={false} 
                            showSecond={false} use12Hours hideDisabledOptions /> */}
                    </div>

                    <div className="dateLabel">
                        <h3>End Date</h3>
                        <DatePicker
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.props.calendarHandleChangeEnd}

                        />
                        <br></br>
                    </div>


                </div>

                <input type="submit" value="Submit" />
            
            
            
            </form>
        );
    }
}

export default Calendar;