import React, { Component } from 'react';
import Moment from 'moment';
import { extendMoment } from 'moment-range';
import ReactTable from 'react-table';
import "react-table/react-table.css";
const moment = extendMoment(Moment);


class InfoBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],

            columns:[{
                Header: 'Active Usage',
                accessor: 'activeUsage'
            },{
                Header: 'Total Usage',
                accessor: 'averageTime'
            },{
                Header: 'Page Visits',
                accessor: 'totalVisitsPerPeiod'
            },{
                Header: 'New Users',
                accessor: 'newUser'
            },{
                Header: 'Returning Users',
                accessor: 'returningUser'
            }
        ]
        }
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
                data:[{averageTime: myAvgTimeSpent,
                totalVisitsPerPeiod: totalVisits,
                newUser: totalNewUser,
                returningUser: totalReturnUser,
                activeUsage: avgActiveTimeSpent}]
            });
        }else {
            this.setState({
               data:[{ averageTime: 0 + " : " + 0 + " : " + 0,
                totalVisitsPerPeiod: totalVisits,
                newUser: totalNewUser,
                returningUser: totalReturnUser,
                activeUsage: 0 + " : " + 0 + " : " + 0}]
            });
        }
    }


    milliToTime(milli) {
        var time = new Moment.duration(milli);
        var hours = moment.duration(time).hours();
        var minutes = moment.duration(time).minutes();
        var seconds = moment.duration(time).seconds();
        return (hours + " : " + minutes + " : " + seconds);
    }

    render() {
        return (
            <div >
                <ReactTable data={this.state.data} columns={this.state.columns} minRows={1}
                            showPageSizeOptions={false} showPageJump={false} showPagination={false}/>
            </div>
        );
    }
}

export default InfoBar;
