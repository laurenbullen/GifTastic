// create variable to hold snacks in array
var snacks = ["Chips", "Cookies", "Candy", "Donuts"];


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
renderButtons();
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
// clears the user input
// $("#snack-input").empty()

// The next goal is to make the snack gif buttons clickable. Each onclick of a button should display 10 gifs related to the button label.

$(document).on("click", "button", function(){
    var snack = $(this).attr("data-name")

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + snack +"&api_key=FZoKa8kXZElSv2nSaByOPqpRDhNGr0xs&limit=10";
    
    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
      })
      // After the data comes back from the API
      .then(function(response) {
          console.log(response);
        // Storing an array of results in the results variable
        var results = response.data;
        // Now we have to loop through the response results 
        for (let i = 0; i < results.length; i++) {
            // We want only to display snack gifs with ratings G and PG
            if(results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // creating a div for each snack gif
                var snackDiv = $("<div>");
                // store rating infor in a variable
                var rating = results[i].rating;
                // display rating in <p> tag
                var p = $("<p>").text("Rating: " + rating);
                // creating an image tag
                var snackImage = $("<img>");
                // give the image tag an src attribute
                snackImage.addClass("snack");
                snackImage.attr("src", results[i].images.fixed_height.url);
                snackImage.attr("alt", "gif");
                snackImage.attr("data-state", "still");
                snackImage.attr('data-still', results[i].images.fixed_height_still.url);
                snackImage.attr('data-animate', results[i].images.fixed_height.url);
                // Appending the paragraph and personImage we created to the "gifDiv" div we created
                snackDiv.append(p);
                snackDiv.append(snackImage);
                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#snacks-appear-here").prepend(snackDiv);

                
            } 
                
        }
        // Now that the buttons work, there should be an onclick for each individual snack gif that switches the state from still to active, and then back to still on a second onclick.
        $(".snack").on('click', function(){

            var state = $(this).attr("data-state");
            if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
            } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
            }
        })
        
      })
        
        
        
            

})


