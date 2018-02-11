var interactionContainer = [];
var startTime = Date.now();

class UserInteraction {
    constructor(event, type) {
        this.xPosition = event.clientX - event.target.offsetTop;
        this.yPosition = event.clientY - event.target.offsetTop;
        this.pageUrl = window.location.href;
        this.type = type;
        this.userType = "no-type";

        if (type === "click") {
            this.milliSeconds = Date.now();
            this.timeSpent = 0;
        } else {
            this.milliSeconds = startTime;
            this.timeSpent = Date.now() - startTime;
        }
    }
}

class TrackUser{
    constructor(typeOfUser) {
        this.xPosition = 0;
        this.yPosition = 0;
        this.pageUrl = window.location.href;
        this.type = "no-type";
        this.userType = typeOfUser;
        this.milliSeconds = Date.now();
        this.timeSpent = 0;
    }
}


function checkCookie(event){
    var checkUser = getCookie("usertype");
    if(checkUser !== ""){
        var returnUser = new TrackUser("returningUser");
        interactionContainer.push(JSON.stringify(returnUser));
        storeData();
    }else {
        var newUser = new TrackUser("newUser");
        interactionContainer.push(JSON.stringify(newUser));
        storeData();
        setCookie("usertype","returningUser",365);
    }
}

function getCookie(cookieName){
    var name = cookieName + "=";
    var decodeCookie = document.cookie.split(';');
    for (var i = 0; i < decodeCookie.length; i++){
        var temp = decodeCookie[i];
        while(temp.charAt(0)===' '){
            temp = temp.substring(1);
        }
        if (temp.indexOf(name) === 0){
            return temp.substring(name.length, temp.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, expiredDate) {
    var day = new Date();
    day.setTime(day.getTime() + (expiredDate * 24 * 60 * 60 * 1000));
    var expires = "expires="+day.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function toggleDashboard(event) {
    if (event.keyCode === 90 && event.ctrlKey) {
        document.removeEventListener('click',getClickingInformation);
        document.getElementById("sidenav").style.right = "0px";
        if (document.getElementsByClassName("react-datepicker")[0] !== undefined) {
                document.getElementsByClassName("react-datepicker")[0].style.display = 'inline-block';
            }
        if (document.getElementsByClassName("rc-time-picker-panel")[0] !== undefined) {
                document.getElementsByClassName("rc-time-picker-panel")[0].style.display = 'inline-block';
        }
    }

    if (event.keyCode === 88 && event.ctrlKey) {
        document.addEventListener('click', getClickingInformation);
        document
            .getElementById("sidenav").style.right = "-2000px";
            if (document.getElementsByClassName("react-datepicker")[0] !== undefined) {
                document.getElementsByClassName("react-datepicker")[0].style.display = 'none';
            }
            if (document.getElementsByClassName("rc-time-picker-panel")[0] !== undefined) {
                document.getElementsByClassName("rc-time-picker-panel")[0].style.display = 'none';

            }
    }
}

function getClickingInformation(event) {
    var click = new UserInteraction(event, "click");
    interactionContainer.push(JSON.stringify(click));
    storeData();
    //testStoreData();
}

function captureBeforeCloseEvent(event) {
    var visit = new UserInteraction(event, 'visit');
    interactionContainer.push(JSON.stringify(visit));
    window.onbeforeunload = storeData();
}

function storeData() {

        var encodedJSON = encodeURIComponent(JSON.stringify(interactionContainer));
        var img = new Image();
        img.src = "https://czjc3xa9e8.execute-api.us-east-2.amazonaws.com/Production/senddata?param" +
                "s=" + encodedJSON;
        interactionContainer = [];
}

window.addEventListener('load', checkCookie);
window.addEventListener('keydown', toggleDashboard);
window.addEventListener('unload', captureBeforeCloseEvent);
document.addEventListener('click', getClickingInformation);

