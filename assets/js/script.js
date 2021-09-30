//getting today's date and dsiplaying it on the page.
var today = moment();
$("#currentDay").text(today.format("dddd, MMM Do"));

//global variables necessary for displaying the messages.
var containerEL = $(".container");
var messagesArray = [];
var currentHour = moment().format('H');

//variables corresponding to each hour block.
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


//this array of objects correlates each hour block with a number value and an empty String.
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

//this for loop sets the background color for the hour blocks.
for(var i = 0; i < valuesArray.length; i++){
    if(currentHour > valuesArray[i].value){
        //any hours that have already passed will be gray.
        valuesArray[i].element.siblings().first().addClass("past");
    }
    else if(currentHour == valuesArray[i].value){
        //the current hour will be red.
        valuesArray[i].element.siblings().first().addClass("present");
    }
    else{
        //the hours not yet gone by will be green.
        valuesArray[i].element.siblings().first().addClass("future");
    }

}

//this function will iterate through our array, taking out any objects with a repeat value.
function overwriteMessages(newMessObj){
        var k = 0;
        while(k < messagesArray.length){
            if(messagesArray[k].value == newMessObj.elementId){
                messagesArray.splice(k, 1);
            }
            else{
                k++;
            }
        }  
}

//when the save button is clicked, an object is pushed into an array and saved in local storage.
function handleFormSubmit(event){
    event.preventDefault();
    
    var targetButton = $(this);
    //this variable stores the message written in the text area.
    scheduledItem = targetButton.parent().children().eq(1).val();
    //this variable stores the ID corresponding to the hour.
    var targetId = targetButton.siblings().eq(0).attr('id');

    messagesArray = JSON.parse(localStorage.getItem("myMessages")) || [];

    var newMessObj = {elementId: targetId, message: scheduledItem}
    
    if(scheduledItem != undefined || scheduledItem != null){
    overwriteMessages(newMessObj);
    messagesArray.push(newMessObj);
    window.localStorage.setItem("myMessages", JSON.stringify(messagesArray));
    }

}

//this function will populate any messages in the local storage in the corresponding box.
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

//event listener for the save buttons.
containerEL.on('click', '.btn', handleFormSubmit);

//on page load, show the existing messages.
$('Document').ready(showMyMessages());