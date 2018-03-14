// Initialize Firebase
var config = {
    apiKey: "AIzaSyDeGkmM8yLp1mGe3Dh7sTVTxZA6XVj3srU",
    authDomain: "pikaflik-9cfdc.firebaseapp.com",
    databaseURL: "https://pikaflik-9cfdc.firebaseio.com",
    projectId: "pikaflik-9cfdc",
    storageBucket: "",
    messagingSenderId: "25073261476"
};

firebase.initializeApp(config);

// Created a variable to reference to the firebase 
var db = firebase.database();

//   db.ref().push({
//     trainName: "choo choo",
//     destination: "destination",
//     dateAdded: firebase.database.ServerValue.TIMESTAMP
//   })

var clickedNumber = 1;
var rowNumber = 0;
// On click function for add button, creates new space for group button
$("#plus-box").on("click", function () {
    clickedNumber++;
    // If you've clicked the button 3 times, then we will create a new row and add everything to that row and present it. The second time is if it's been clicked 4 times
    // if (clickedNumber % 3 === 0) {
    //     var newRow = $("<div class='row'></div>");
    //     var newDiv = $("<div class='col-md-3'></div>");
    //     var newButton = $("<button>");
    //     var p = $("<p>");
    //     p.addClass("group-box");
    //     newButton.text("Select");
    //     p.append("Group 42");
    //     p.append(newButton);
    //     newDiv.append(p);
    //     newRow.append(newDiv);
    //     $("#main-body").append(newDiv);

    // } else {

    var newDiv = $("<div class='col-md-3'></div>");
    var newButton = $("<button>");
    var p = $("<p>");
    p.addClass("group-box");
    newDiv.addClass("top-height");
    newButton.text("Select");
    p.append("Group 42");
    p.append(newButton);
    // newDiv.attr("margin-top", "25px");
    newDiv.append(p);
    $("#first-row").append(newDiv);
    // }
});

// on click function to clear top movie
function myFunction() {

    var groupPageReset = document.getElementById("topMoviePoster");

    // This will add the class
    groupPageReset.classList.add("hide");
    // This will hide the class
    groupPageReset.classList.remove("src");
    

    // $('#topMoviePoster').removeAttr('src').replaceWith($image.clone());
    
}





