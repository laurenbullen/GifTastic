// create variable to hold snacks in array
var snacks = ["Chips", "Cookies", "Candy", "Donuts"];
// var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + snack +"&api_key=FZoKa8kXZElSv2nSaByOPqpRDhNGr0xs&limit=10";


// this funciton is to create buttons for each snack in the array
function renderButtons() {

    // this prevents buttons from being repeated
    $("#snacks-view").empty();

    // this for loop will loop through the array of snacks and create a button for each
    for (let i= 0; i < snacks.length; i++) {
        // creates buttonf for each snack
        var snackButton = $("<button>");
        // adds the class "snack" to each button
        snackButton.addClass("snack");
        // adds the name of each snack to the data attribute data-name
        snackButton.attr("data-name", snacks[i]);
        // shows the text of each snack name on the button
        snackButton.text(snacks[i]);
        // appends the newest snack button to the previous in the snacks-view div
        $("#snacks-view").append(snackButton);
        
    }
}

// this function will add new buttons based on the user input
$("#add-snack").on("click", function(event){

    event.preventDefault();
    // takes value of snack that user types into input
    var snack = $("#snack-input").val().trim();
    // pushes new snack into snacks array
    snacks.push(snack);

    renderButtons();

})
renderButtons()

// The next goal is to make the snack gif buttons clickable. Each onclick of a button should display 10 gifs related to the button label.

// Now that the buttons work, there should be an onclick for each individual gif that switches the state from still to active, and then back to still on a second onclick.