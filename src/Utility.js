var urlBase = 'https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/getdata?query=';
var dataArray = [];
var queryTimeObject = {startDate: 0, endDate: 0,startTime: 0, endTime: 0};


class Utility {

    static getDates(timeObj){
        queryTimeObject.startDate = timeObj.startDay;
        queryTimeObject.endDate = timeObj.endDay;
        queryTimeObject.startTime = timeObj.startTime;
        queryTimeObject.endTime = timeObj.endTime;
    }


    static getData(callback, app) {
        
        var urlObject = {startDateTime: queryTimeObject.startDate + queryTimeObject.startTime, 
            endDateTime: queryTimeObject.endDate + queryTimeObject.endTime, pageUrl: window.location.href};
        
        dataArray.push(JSON.stringify(urlObject));
        
        var jsonUrlObject = encodeURIComponent(JSON.stringify(dataArray));
        
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var responseData = xhr.responseText;
                var json;
                json = JSON.parse(JSON.parse(responseData));
                if(json.length === 0) { 
					alert("No data could be retrieved for parameters specified.");
                }
                callback(json, app); 
            }
            
        }
        xhr.open("GET", urlBase + jsonUrlObject);
        xhr.send();
        dataArray = [];
    }

    
}

export default Utility;
