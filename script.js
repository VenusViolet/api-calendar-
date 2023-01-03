const currentDate = moment().format('dddd MMMM Do, YYYY');
const currentTime = moment().format('hh:mm:ss a');
const currentHour = moment().format('HH');
let amPM = "AM";
let finalHour = "";
let timeMap = new Map();

$('#currentDay').text(currentDate);

if (localStorage.getItem("mymap")) {
    timeMap = new Map(JSON.parse(localStorage.mymap));
} else {
    let timeMap = new Map();
}

for (let hour = 9; hour < 18; hour++) {
    let timeBlock = $('<div>');
    if (hour < 12) {
        amPM = "AM";
    } else {
        amPM = "PM";
    }
    let timeDiv = $('<div>');
    if (hour > 12) {
        finalHour = hour - 12; 
    } else {
        finalHour = hour;
    }

    if (finalHour < 10) {
        finalHour = " " + finalHour;
    }
}

timeDiv.text(finalHour + amPM);
timeDiv.addClass('time-div');

let descriptionDiv = $("<div>");
let textAreaForDiv = $("<textarea>");
textAreaForDiv.attr('id', 'textarea' + hour);

descriptionDiv.append(textAreaForDiv);
descriptionDiv.addClass("description");
descriptionDiv.css("width", "80%");
