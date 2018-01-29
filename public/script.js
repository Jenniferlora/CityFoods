// Using Ajax

//This function is getting the zip code from the input fields and calculating the latitude and longitud.

$(function() {
    console.log("Zomato -> user-key " + ":" + "a3659cdf82849e643754187ab2abd25c");
    $("#submit").on("click", function(event) {
        var input = $("#city").val();
        makeCall(input);
    });
    //This inner-function will make a call to the weathermap api so we can get latitude and longitude coordinates to use in our main api which is the Zomato api.
    function makeCall(zipcode) {
        $.ajax(
            // `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode}&units=imperial&appid=7ea8ce2fca75f0992d145322b6996de9`,
            `https://developers.zomato.com/api/v2.1/locations?query=${city}` {
                success: function(data) {
                    console.log(data);
                    getData(data);
                }
            }
        );
    }
    //this function is getting the data from our ajax call and storing it into variables.
    function getData(responseData) {
        var city = responseData.name;
        console.log(city);
        var latitude = responseData.coord.lat;
        console.log(latitude);
        var longitude = responseData.coord.lon;
        console.log(longitude);
        appendToDom(city, latitude, longitude);
    }

    // - This function will take each of these parameters and create appropriate elements for each.
    //     - It will then append the elements to the DOM.

    function appendToDom(city, latitude, longitude) {
        var params = [city, latitude, longitude];
        var result = document.querySelector("#result");

        var list = document.createElement("ul");
        list.classList.add("thelist");
        result.appendChild(list);

        params.forEach(function(each) {
            var newDiv = document.createElement("li");
            newDiv.textContent = each;
            newDiv.style.listStyleType = "none";
            list.appendChild(newDiv);
        });
    }
}); // ends doc.ready