import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
const moment = extendMoment(Moment);

class InfoBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            averageTime: 0,
            totalVisitsPerPeiod: 0,
            newUser: 0,
            returningUser: 0,
            activeUsage: 0
        };
        this.handleData = this.handleData.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        this.handleData(nextProps.data);
    }


    handleData(dataArray) {
        var totalTimeSpent = 0;
        var myAvgTimeSpent = 0;
        var avgActiveTimeSpent = 0;
        var totalVisits = 0;
        var totalReturnUser = 0;
        var totalNewUser = 0;
        var engagedUser = 0;

        for (var i = 0; i < dataArray.length; i++) {
            var type = dataArray[i].type;
            var userType = dataArray[i].userType;

            if (type === 'visit') {
                totalTimeSpent += dataArray[i].timeSpent;
                engagedUser += dataArray[i].engagement;
                totalVisits++;
            }

            if(userType === 'returningUser'){
                totalReturnUser++;
            }else if(userType === 'newUser'){
                totalNewUser++;
            }

        }

        if (totalTimeSpent !== 0 && totalVisits !== 0) {
            myAvgTimeSpent = this.milliToTime(totalTimeSpent / totalVisits);
            avgActiveTimeSpent = this.milliToTime(engagedUser/totalVisits);

            this.setState({
                averageTime: myAvgTimeSpent,
                totalVisitsPerPeiod: totalVisits,
                newUser: totalNewUser,
                returningUser: totalReturnUser,
                activeUsage: avgActiveTimeSpent
            });
        }else {
            this.setState({
                averageTime: 0 + " hrs " + 0 + " mins " + 0 + " secs ",
                totalVisitsPerPeiod: totalVisits,
                newUser: totalNewUser,
                returningUser: totalReturnUser,
                activeUsage: 0 + " hrs " + 0 + " mins " + 0 + " secs "
            });
        }
    }


    milliToTime(milli) {
        var time = new Moment.duration(milli);
        var hours = moment.duration(time).hours();
        var minutes = moment.duration(time).minutes();
        var seconds = moment.duration(time).seconds();
        return (hours + " hrs " + minutes + " mins " + seconds + " secs ");
    }

    render() {
        return (
            <div className="infobar">

                <ul>
                    <li> Average Active Time on Page</li>
                    <li>{this.state.activeUsage}</li>
                </ul>

                <ul>
                    <li> Average Total Time on Page</li>
                    <li>{this.state.averageTime}</li>
                </ul>

                <ul>
                    <li> Page Visits</li>
                    <li>{this.state.totalVisitsPerPeiod}</li>
                </ul>

                <ul>
                    <li> New Users</li>
                    <li>{this.state.newUser}</li>
                </ul>

                <ul>
                    <li> Returning Users</li>
                    <li>{this.state.returningUser}</li>
                </ul>


            </div>
        );
    }
}

export default InfoBar;
