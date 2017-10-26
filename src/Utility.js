var urlBase = 'https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/getdata';
var dataArray = [];
var queryTimeObject = {startDate: 0, endDate: 0,startTime: 0, endTime: 0};
var startAppend = 'startTime=';
var endAppend = 'endTime=';
var urlAppend = '?pageUrl=';

class Utility {

    static getDates(timeObj){
        queryTimeObject.startDate = timeObj.startDay;
        queryTimeObject.endDate = timeObj.endDay;
        queryTimeObject.startTime = timeObj.startTime;
        queryTimeObject.endTime = timeObj.endTime;
    }


    static getData() {
        // var url = urlBase + urlAppend + window.location.href + '&' + 
        // startAppend + dateObject.startDate + '&' + endAppend + dateObject.endDate;
        console.log(queryTimeObject);
        var xhr = new XMLHttpRequest();
        
        
        console.log('Test 1');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                // var responseData = xhr.responseText;
                // var json = JSON.parse(responseData);
                // console.log(json);
				console.log(xhr.responseText);	
            }
            
        }
        xhr.open("GET", urlBase);
        xhr.send();
    }
}

export default Utility;
