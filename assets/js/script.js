var today = moment();
$("#currentDay").text(today.format("dddd, MMM Do"));

var containerEL = $(".container");
var messagesArray = [];

var eightAM = $("#8");
var nineAM = $("#9");
var tenAM = $("#10");
var elevenAM = $("#11");
var twelveAM = $("#12");
var onePM = $("#13");
var twoPM = $("#14");
var threePM = $("#15");
var fourPM = $("#16");
var fivePM = $("#17");



var valuesArray = [
{
    element: eightAM,
    value: 8,
    text:""
}, 
{
    element: nineAM,
    value: 9,
    text:""
},
{
    element: tenAM,
    value: 10,
    text:""
},
{
    element: elevenAM,
    value: 11,
    text:""
},
{
    element: twelveAM,
    value: 12,
    text:""
},
{
    element: onePM,
    value: 13,
    text:""
},
{
    element: twoPM,
    value: 14,
    text:""
},
{
    element: threePM,
    value: 15,
    text:""
}, 
{
    element: fourPM,
    value: 16,
    text:""
},
{
    element: fivePM,
    value: 17,
    text:""
},
]



var currentHour = moment().format('H');

for(var i = 0; i < valuesArray.length; i++){
    if(currentHour > valuesArray[i].value){
        valuesArray[i].element.siblings().first().css("background-color", "gray");
        valuesArray[i].element.siblings().first().css("color", "black");
    }
    else if(currentHour == valuesArray[i].value){
        valuesArray[i].element.siblings().first().css("background-color", "red");
        valuesArray[i].element.siblings().first().css("color", "white");
    }
    else{
        valuesArray[i].element.siblings().first().css("background-color", "green");
        valuesArray[i].element.siblings().first().css("color", "white");
    }

}

function handleFormSubmit(event){
    event.preventDefault();
    
    var targetButton = $(event.target);
    //this variable stores the message written in the text area.
    scheduledItem = targetButton.parent().children().eq(1).val();
    //this variable stores the ID corresponding to the hour.
    var targetId = targetButton.siblings().eq(0).attr('id');

    messagesArray = JSON.parse(localStorage.getItem("myMessages")) || [];

    
    if(scheduledItem != undefined || scheduledItem != null){
    messagesArray.push({elementId: targetId, message: scheduledItem});
    window.localStorage.setItem("myMessages", JSON.stringify(messagesArray));
    }

}



containerEL.on('click', '.btn', handleFormSubmit);

function showMyMessages(){

    messagesArray = JSON.parse(localStorage.getItem("myMessages")) || [];
    var j = 0;
    for(var i = 0; i < messagesArray.length; i++) {
        while(messagesArray[i].elementId != valuesArray[j].value){
            j++;
        }
        valuesArray[j].element.siblings().first().text(messagesArray[i].message);
    }

}

$('Document').ready(showMyMessages());