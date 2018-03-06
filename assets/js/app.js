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