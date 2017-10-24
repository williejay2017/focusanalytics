var urlBase = 'https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/getdata';
var dataArray = [];
var dateObject = {startDate: null, endDate: null};
var startAppend = 'startTime=';
var endAppend = 'endTime=';
var urlAppend = '?pageUrl=';

class Utility {

    static getDates(startDate,endDate){
        dateObject.startDate = startDate;
        dateObject.endDate = endDate;
    }


    static getData() {
        var url = urlBase + urlAppend + window.location.href + '&' + 
        startAppend + dateObject.startDate + '&' + endAppend + dateObject.endDate;
        console.log(dateObject);
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
