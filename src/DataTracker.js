var interactionContainer = [];
var startTime = Date.now();

class UserInteraction {
    constructor(event, type) {
        this.xPosition = event.clientX;
        this.yPosition = event.clientY;
        this.pageUrl = window.location.href;
        this.type = type;

        if (type === "click") {
            this.milliSeconds = Date.now();
            this.timeSpent = 0;
        } else {
            this.milliSeconds = startTime;
            this.timeSpent = Date.now() - startTime;
        }
    }
}

function toggleDashboard(event) {
    if (event.keyCode === 90 && event.ctrlKey) {
        document.removeEventListener('click',getClickingInformation);
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
        document
            .getElementById("sidenav").style.right = "-600px";
            //hide calendar datepicker popup whn the dashboard closes
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

window.addEventListener('keydown', toggleDashboard);
window.addEventListener('unload', captureBeforeCloseEvent);
document.addEventListener('click', getClickingInformation);

