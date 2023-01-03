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


timeDiv.text(finalHour + amPM);
timeDiv.addClass('time-div');

let descriptionDiv = $("<div>");
let textAreaForDiv = $("<textarea>");
textAreaForDiv.attr('id', 'textarea' + hour);

descriptionDiv.append(textAreaForDiv);
descriptionDiv.addClass("description");
descriptionDiv.css("width", "80%");

let saveIcon = $('<i>');
saveIcon.addClass("fa fa-save");

let saveDiv = $("<div>");
saveDiv.addClass("saveBtn ");
saveDiv.attr('id', hour);

saveDiv.append(saveIcon);

timeBlock.append(timeDiv, descriptionDiv, saveDiv);

timeBlock.addClass("time-block row");

if (currentHour > hour) {
    timeBlock.addClass("past");
} else if (currentHour < hour) {
    timeMap.addClass("future");
    textAreaForDiv.attr("placeholder", "Enter a task to complete this hour...");
} else {
    timeBlock.addClass("present");
    textAreaForDiv.attr("placeholder", "Enter a task to complete this hour...");
}

$("#main-contain").append(timeBlock);

}

timeMap.forEach(function (text, key) {
    let textAreaVar = "#textarea" + key;
    document.querySelector(textAreaVar).vale = text;
});

$(".saveBtn").on('click', function () {
    let textareaVar = "#textarea" + (this.id);

    timeMap.set((this.id), document.querySelector(textAreaVar).value);

    localStorage.mymap = JSON.stringify(Array.from(timeMap.entries()));

});