var interactionContainer = [];
var startTime = Date.now();
var interval;


class UserInteraction {
    constructor(event, type, activeTime) {
        this.xPosition = event.clientX - event.target.offsetTop;
        this.yPosition = event.clientY - event.target.offsetTop;
        this.pageUrl = window.location.href;
        this.type = type;
        this.userType = "no-type";

        if (type === "click") {
            this.milliSeconds = Date.now();
            this.timeSpent = 0;
            this.engagement = 0;
            this.htmlelem = [event.target.tagName, event.target.className, event.target.id, event.target.parentElement].toString();
        } else {
            this.milliSeconds = startTime;
            this.timeSpent = Date.now() - startTime;
            this.engagement = activeTime;
            this.htmlelem = null;
        }
    }
}

class TrackUser {
    constructor(typeOfUser) {
        this.xPosition = 0;
        this.yPosition = 0;
        this.pageUrl = window.location.href;
        this.type = "no-type";
        this.userType = typeOfUser;
        this.milliSeconds = Date.now();
        this.timeSpent = 0;
        this.htmlelem = null;
    }
}


function checkCookie(event) {
    var checkUser = getCookie("usertype");
    if (checkUser !== "") {
        var returnUser = new TrackUser("returningUser");
        interactionContainer.push(JSON.stringify(returnUser));
        storeData();

    } else {
        var newUser = new TrackUser("newUser");
        setCookie("usertype", "returningUser", 365);
        interactionContainer.push(JSON.stringify(newUser));
        storeData();

    }
}

function getCookie(cookieName) {
    var name = cookieName + "=";
    var decodeCookie = document.cookie.split(';');
    for (var i = 0; i < decodeCookie.length; i++) {
        var temp = decodeCookie[i];
        while (temp.charAt(0) === ' ') {
            temp = temp.substring(1);
        }
        if (temp.indexOf(name) === 0) {
            return temp.substring(name.length, temp.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, expiredDate) {
    var day = new Date();
    day.setTime(day.getTime() + (expiredDate * 24 * 60 * 60 * 1000));
    var expires = "expires=" + day.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


function start() {
    interval = setInterval(function () {
       Date.now() - startTime;
    }, 100);
    return interval;
}

function stop() {
    clearInterval(interval);
}


function toggleDashboard(event) {
    if (event.keyCode === 90 && event.ctrlKey) {
        document.removeEventListener('click', getClickingInformation);
        document.removeEventListener('mousemove', start);
        document.removeEventListener('mousewheel',start);
        stop();
        document.getElementById("sidenav").style.right = "0";
        if (document.getElementsByClassName("react-datepicker")[0] !== undefined) {
            document.getElementsByClassName("react-datepicker")[0].style.display = 'inline-block';
        }
        if (document.getElementsByClassName("rc-time-picker-panel")[0] !== undefined) {
            document.getElementsByClassName("rc-time-picker-panel")[0].style.display = 'inline-block';
        }
    }

    if (event.keyCode === 88 && event.ctrlKey) {
        document.addEventListener('click', getClickingInformation);
        document.addEventListener('mousemove', start);
        document.addEventListener('mousewheel', start);
        document.getElementById("sidenav").style.right = "-600px";
        if (document.getElementsByClassName("react-datepicker")[0] !== undefined) {
            document.getElementsByClassName("react-datepicker")[0].style.display = 'none';
        }
        if (document.getElementsByClassName("rc-time-picker-panel")[0] !== undefined) {
            document.getElementsByClassName("rc-time-picker-panel")[0].style.display = 'none';

        }
    }
}

function getClickingInformation(event) {
    var click = new UserInteraction(event, "click", 0);
    interactionContainer.push(JSON.stringify(click));
    //testStoreData();
    storeData();
}

function captureBeforeCloseEvent(event) {
    var sendEngagement = start();
    var visit = new UserInteraction(event, 'visit', sendEngagement);
    interactionContainer.push(JSON.stringify(visit));
    //window.onbeforeunload = testStoreData();
    window.onbeforeunload = storeData();
}



function storeData() {

    var encodedJSON = encodeURIComponent(JSON.stringify(interactionContainer));
    var img = new Image();
    img.src = "https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/senddata?param" +
        "s=" + encodedJSON;
    interactionContainer = [];
    stop();
}

// function testStoreData() {
//     var encodedJSON = encodeURIComponent(JSON.stringify(interactionContainer));
//     var xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState === 4 && xhr.status === 200) {
//             var responseData = xhr.responseText;
           
           
//         }
        
//     }
//     xhr.open("GET",  'https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/senddata?params=' + encodedJSON);
//     xhr.send();
//     interactionContainer = [];
// }


window.addEventListener('load', checkCookie);
window.addEventListener('keydown', toggleDashboard);
window.addEventListener('load', captureBeforeCloseEvent); 
document.addEventListener('click', getClickingInformation); 
document.addEventListener('click', start); 
document.addEventListener('mousemove', start);
document.addEventListener('mousewheel', start);
