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
            <form onSubmit={this.props.handleSubmit}>
                <div className="parentElement">

                        <h3 className="childElement">Start Date</h3>
                        <div className="childElement">
                        <DatePicker
                            className="childElement"
                            selected={this.state.startDate}
                            selectsStart
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.props.calendarHandleChangeStart}
                        />
                        </div>
                        <div className="childElement">
                          <TimePicker disabledMinutes={this.disableMinutes} defaultValue={this.currentMoment}
                            onChange={this.props.changeStartTimeValue} format={this.format} allowEmpty={false}
                            showSecond={false} className="childElement" use12Hours hideDisabledOptions />
                        </div>
                  </div>
                    <br></br>
                  <div className="parentElement">
                        <h3 className="childElement">End Date</h3>
                        <div className="childElement">
                        <DatePicker
                            selected={this.state.endDate}
                            selectsEnd
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.props.calendarHandleChangeEnd}

                        />
                        </div>
                        <div className="childElement">
                         <TimePicker disabledMinutes={this.disableMinutes} defaultValue={this.currentMoment}
                            onChange={this.props.changeEndTimeValue} format={this.format} allowEmpty={false}
                            showSecond={false} className="xxx" use12Hours hideDisabledOptions />
                        </div>



                </div>
                <br></br>
                <input type="submit" value="Submit" />



            </form>
        );
    }
}

export default Calendar;
