var queryTimeObject = {startDate: 0, endDate: 0,startTime: 0, endTime: 0};
var user = {emailID:"noemail@noemail.com", password:"nopassword", pageUrl:"noUrl"}

class Utility {

    static setDates(timeObj){
        queryTimeObject.startDate = timeObj.startDate;
        queryTimeObject.startTime = timeObj.startTime;
        queryTimeObject.endTime = timeObj.endTime;
        queryTimeObject.endDate = timeObj.endDate;
    }

    static getTimeObject(){
        return queryTimeObject;
    }

    static idolCheck(){
    this.location.reload(true);
  }

    static setLogin(loginID,passWord){
        user = {emailID:loginID, 
                password:passWord, 
                pageUrl:window.location.href};
    }

    static getAuthorization(callback,app){
        var dataArray = [];
        var urlBase = "https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/authorize?authorize=";
        var json;
        dataArray.push(JSON.stringify(user));
        var jsonUrlObject = encodeURIComponent(JSON.stringify(dataArray));
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(){
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = xhr.responseText;
                json = JSON.parse(JSON.parse(response));
                callback(json, app);
            }
        }
        xhr.open("GET", urlBase + jsonUrlObject);
        xhr.send();
        dataArray = [];
       
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
