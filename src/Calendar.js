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
            startTime: props.startTime,
            endTime: props.endTime
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            startDate: nextProps.startDate,
            endDate: nextProps.endDate,
            startTime: nextProps.startTime,
            endTime: nextProps.endTime
        });
    }

    currentMoment = moment().hour(0).minute(0);

    format = 'h:mm A';

    disableMinutes = () => {
        var minuteRestrictionArray = [];
        for (var i = 0; i < 60; i++) {

            if (i !== 0 && i !== 30) {
                minuteRestrictionArray.push(i);
            }
        }
        return minuteRestrictionArray;
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
                          <TimePicker disabledMinutes={this.disableMinutes} defaultValue={this.currentMoment} 
                            onChange={this.props.changeStartTimeValue} format={this.format} allowEmpty={false} 
                            showSecond={false} className="xxx" use12Hours hideDisabledOptions /> 
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
                         <TimePicker disabledMinutes={this.disableMinutes} defaultValue={this.currentMoment} 
                            onChange={this.props.changeEndTimeValue} format={this.format} allowEmpty={false} 
                            showSecond={false} className="xxx" use12Hours hideDisabledOptions /> 
                    </div>


                </div>

                <input type="submit" value="Submit" />
            
            
            
            </form>
        );
    }
}

export default Calendar;