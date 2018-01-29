$(function() {
  $("#submit").on("click", function(event) {
    //when the submit button is clicked, grab the value from inside the text field
    var input = document.querySelector("#movie-title").value;
    //pass in the variable 'input' to the makeCall function
    makeCall(input);
  });

  //make an ajax call on the url
  //the parameter 'movietitle' being passed into the makeCall function is the same as 'input' on line 6
  function makeCall(movietitle) {
    $.ajax(
      //pass in the parameter movietitle as a string literal
      // `http://api.openweathermap.org/responseData/2.5/weather?zip=${zipcode}&units=imperial&appid=13ea59b3b65e71615a0866c1fe099c8f`,
      `http://www.omdbapi.com/?t=${movietitle}&apikey=a28799f5`,
      {
        success: function(responseData) {
          console.log(responseData);
          //invoke the getresponseData function below with 'responseData' passed in as parameter. performs a get request to retrieve responseData
          getresponseData(responseData);
        }
      }
    );
  }

  //retrieve the following responseData and store inside variables
  //the parameter 'responseData' is the same as 'responseData' being passed from line 18, just renamed for our sake
  function getresponseData(responseData) {
    var title = responseData.Title;
    var year = responseData.Year;
    var imdb = responseData.Ratings[0]["Value"];
    var rottenTomatoes = responseData.Ratings[1]["Value"];
    var poster = responseData.Poster;
    console.log(poster);
    //pass the variables in as parameters in the appendToDom function and invoke it
    appendToDom(title, year, imdb, rottenTomatoes, poster);
  }

  function appendToDom(title, year, imdb, rottenTomatoes, poster) {
    var $title = $("<div/>", { text: `Title: ${title}` });
    var $year = $("<div/>", {
      text: `Year: ${year}`
    });
    var $imdb = $("<div/>", {
      text: `IMDB: ${imdb}`
    });
    var $rottenTomatoes = $("<div/>", {
      text: `Rotten Tomatoes: ${rottenTomatoes}`
    });
    var $poster = $("<img/>", {
      id: "poster",
      src: `${poster}`
    });

    $("#result").append($title, $year, $imdb, $rottenTomatoes, $poster);
  }
}); // ends doc.ready
