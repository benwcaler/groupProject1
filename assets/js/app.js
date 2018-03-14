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

// Variables with user authentication
const auth = firebase.auth();
auth.onAuthStateChanged(firebaseUser => { });
var logOut = document.getElementById("btnLogOut");


// **************************** API CALL STUFF ************************************
// Variables
var year = 2012
var genre = 12;
var movieName;
var imdbId;
var titles = [];
var posters = [];
var pages = [];
var calls = 0;
var selected = [];
var genre, year1, year2;
// Object for storing movie selections
var movieChoices = {
  genre: null,
  year1: null,
  year2: null
}


$("#groupSubmit").on("click", function () {



  
  // Setting Genre
  switch ($("#genre").val()) {
    case "Action":
      genre = 28;
      break;
    case "Comedy":
      genre = 35;
      break;
    case "Documentary":
      genre = 99;
      break;
    case "Drama":
      genre = 18;
      break;
    case "Horror":
      genre = 27;
      break;
  }

  // Setting years based off of selection
  switch ($("#year").val()) {
    case "Silent 1890-1929":
      year1 = 1890;
      year2 = 1929;
      break;
    case "Classic 1930-1969":
      year1 = 1930;
      year2 = 1969;
      break;
    case "Modern 1970-1999":
      year1 = 1970;
      year2 = 1999;
      break;
    case "Contemporary 2000-Now":
      year1 = 2000;
      year2 = 2018;
      break;
  }

  movieChoices.genre = genre;
  movieChoices.year1 = year1;
  movieChoices.year2 = year2;
  
  db.ref("Group1/movieInfo").set(movieChoices)


    $.ajax({
      url: "https://api.themoviedb.org/3/discover/movie?api_key=55fdfce207e38e045803eb5855ec3bca&language=en-US&sort_by=vote_count.asc&include_adult=false&include_video=true&page=1&primary_release_date.gte=" + year1 + "&primary_release_date.lte=" + year2 + "&with_genres=" + genre,
      method: "GET"
  }).then(function (response) {
    console.log(response);
      var pageNums = [];
      for (var i = 1; i < 8; i++) {
          pageNums.push(Math.floor(Math.random() * (response.total_pages - 1)))
      }
      db.ref("Group1/pages").set(pageNums)
  });
})


// Listener
db.ref("Group1/pages").on("child_added", function (snapshot) {
  var numref = JSON.parse(JSON.stringify(snapshot.val()))
  pages.push(numref)
  console.log(pages);
});



// **************************** END API CALL STUFF ************************************






// **************************** USER AUTHENTICATION ********************************


// Get Elements
var txtEmail;
var txtPassword;



// Add login event
$("#btnLogin").on("click", function () {
  // Get email and pass
  txtEmail = $("#txtEmail").val();
  txtPassword = $("#txtPassword").val();
  // Sign in 
  const promise = auth.signInWithEmailAndPassword(txtEmail, txtPassword);
  promise.catch(e => console.log(e.message));
})

// Add Sign up event
$("#btnSignUp").on("click", function () {
  // Get email and pass
  txtEmail = $("#txtEmail").val().trim();
  txtPassword = $("#txtPassword").val().trim();
  // Sign up 
  const promise = auth.createUserWithEmailAndPassword(txtEmail, txtPassword);
  promise.catch(e => console.log(e.message));
})



// Add Sign out event
$("#btnLogOut").on("click", function () {
  // Sign out 
  firebase.auth().signOut();
  console.log("test");
});


// Add a reatime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    console.log(firebaseUser)
    console.log(firebaseUser.email)
    console.log(firebaseUser.Kb.I)
    // logOut.classList.remove("hide");
    $("#userName").text("Hi " + firebaseUser.email + "!");
  } else {
    console.log('not logged in');
    // logOut.classList.add("hide");
    $("#userName").text("Hi!");
  }
});


// **************************** END USER AUTHENTICATION ********************************


// ajax call for itunes



// $(".mPoster").on("click", function () {
// $.ajax({
//     url: "https://itunes.apple.com/search?media=movie&term=shrek",
//     method: "GET"
// }).then(function (response) {
//     console.log(response);
// });
// })






















// Test for pushing data to the database
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






    
$(".movieInfo").on('click', function () {
  alert("Handler for .click() called.");
});
