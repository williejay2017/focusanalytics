var queryTimeObject = {startDate: 0, endDate: 0,startTime: 0, endTime: 0};


class Utility {

    static setDates(timeObj){
        queryTimeObject.startDate = timeObj.startDay;
        queryTimeObject.endDate = timeObj.endDay;
        queryTimeObject.startTime = timeObj.startTime;
        queryTimeObject.endTime = timeObj.endTime;
    }

    static processData(data){
        var heatMapData = [];
        var i;
        var type;
        for(i = 0; i < data.length; i++){
            type = data[i].type;
            if(type === 'click'){
                let x = parseInt(data[i].xPosition,10);
                let y = parseInt(data[i].yPosition,10);
                heatMapData.push({x:x,y:y,value:1});
            }
        }

        //add more as we see fit (labels etc.)
        var processedData = {
            heatMapData : heatMapData
        }
       
        return processedData;
    }

    static getData(callback, app) {
        var dataArray = [];
        var urlBase = 'https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/getdata?query=';
        var urlObject = {startDateTime: queryTimeObject.startDate + queryTimeObject.startTime, 
            endDateTime: queryTimeObject.endDate + queryTimeObject.endTime, pageUrl: window.location.href};
        
        dataArray.push(JSON.stringify(urlObject));
        
        var jsonUrlObject = encodeURIComponent(JSON.stringify(dataArray));
        
        var json;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var responseData = xhr.responseText;
                json = JSON.parse(JSON.parse(responseData));
                //console.log(json.length);
                //console.log(json[1].xPosition);
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
