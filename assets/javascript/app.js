var nasaData = "https://data.nasa.gov/resource/y77d-th95.json";

var config = {
    apiKey: "AIzaSyCGZZCH_lfY1pys2O1ZWvMLFLU2La9O31I",
    authDomain: "meteroite-visit.firebaseapp.com",
    databaseURL: "https://meteroite-visit.firebaseio.com",
    projectId: "meteroite-visit",
    storageBucket: "meteroite-visit.appspot.com",
    messagingSenderId: "368206631752"
};
firebase.initializeApp(config);

var database = firebase.database();

// initial variables
var userLoc = "";
var allMarkers = [];

// Hide the elements on page load
$("#map").toggle(false);
// Showing opening paragraph
$("#openPara").toggle(true);
// Hiding text area
$("#searched").toggle(false);
// Hiding the table of past searches
$("#searchTable").toggle(false);

// Initialize and show map in HTML
function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: 39.82, lng: 98.57 }
    });
    // Set geocoder variable to pass in as an argument in the gecode function
    var geocoder = new google.maps.Geocoder();
    // On click listener for the search button
    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        console.log("Click works");
        // Show the map on click
        $("#map").toggle(true);
        // Set user search to the userLoc variable
        userLoc = $("#searchText").val().trim();
        console.log(userLoc);
        // Hiding the opening paragraph
        $("#openPara").toggle(false);
        // Showing the searched text area
        $("#searched").toggle(true);
        // Showing the table of past searches
        $("#searchTable").toggle(true);
        // Calling the geocode function to convert the user input
        geocodeAddress(geocoder, map);
        // Removing markers for new search
        deleteMarkers();
        // clearing text box
        $("#searchText").val("");
        // Pushing search location and date to firebase
        database.ref().push({
            location: userLoc,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });
    // On keypress listener to allow pressing enter to start a search, same content as click listener
    $("#searchText").on("keypress", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == '13') {
            event.preventDefault();
            console.log("Enter Works");

            $("#map").toggle(true);
            userLoc = $("#searchText").val().trim();
            console.log(userLoc);

            $("#openPara").toggle(false);

            $("#searched").toggle(true);

            $("#searchTable").toggle(true);

            geocodeAddress(geocoder, map);
            deleteMarkers();
            $("#searchText").val("");

            database.ref().push({
                location: userLoc,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });




        }
    });



    // Call to NASA to get the meteorite data
    $.ajax({
        url: nasaURL,
        type: "GET",
        data: {
            "$limit": 5000,
            "$$app_token": "uPRgN0kLB8vEkkQsOGe7M2weG"
        }
    })

        .then(function (response) {
            // Adding bounds listener to the map to only place pins in the search bounds
            google.maps.event.addListener(map, 'bounds_changed', function () {
                var bounds = map.getBounds();
                if (!bounds) {
                    return;
                }

                //Variable for the info window that appears on click of the markers
                var infowindow = new google.maps.InfoWindow();

                // Variable for the markers that will be set from NASA data
                var marker, i;


                // Loop through the meteorite data from NASA
                for (i = 0; i < response.length; i++) {
                    //Variable to store the lat and long of the search area
                    var myLatLng = new google.maps.LatLng(response[i].reclat, response[i].reclong)

                    // If within the bounds set by myLatLng variable..
                    if (bounds.contains(myLatLng)) {
                        // Place markers for meteorite falls
                        marker = new google.maps.Marker({
                            position: myLatLng,
                            map: map,
                            icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                        });
                        // Click listener for the meteorite markers
                        google.maps.event.addListener(marker, 'click', (function (marker, i) {
                            return function () {
                                // Setting the content of the info box
                                infowindow.setContent("<p>Name: " + response[i].name + "<br />" + "Mass: " + response[i].mass + " grams" + "<br />" + "Year Fell: " + response[i].year + "</p>");
                                infowindow.open(map, marker);
                            }
                        })(marker, i));
                    }
                }
            });
        })


};

// Function to use the Google geocode api to convert user input into map location
function geocodeAddress(geocoder, resultsMap) {
    var address = userLoc;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location,
                animation: google.maps.Animation.DROP
            });
            allMarkers.push(marker)
            console.log(allMarkers);
        } else {
            M.toast({
                html: 'Geocode was not successful for the following reason: ' + status, 
                classes: 'rounded'
            })
        }
    });
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
    for (var i = 0; i < allMarkers.length; i++) {
        allMarkers[i].setMap(map);
    }
}

// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    allMarkers = [];
}

//   adding row to search history table
database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var tabletimeConv = childSnapshot.val().dateAdded;
    var tableuserLoc = childSnapshot.val().location;
    // Store everything into a variable.
    var dateAdded = firebase.database.ServerValue.TIMESTAMP

    tabletimeConv = moment(dateAdded).format("MM/DD/YYYY");

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(tabletimeConv),
        $("<td>").text(tableuserLoc),
    );

    // Append the new row to the table
    $("#searchTable > table > tbody").append(newRow);
});


// URL to pull data for NASA
var nasaURL = "https://data.nasa.gov/resource/y77d-th95.json";

// resetting the page back to the beginning without a refresh
$("#title").on("click", function () {
    $("#map").toggle(false);
    $("#openPara").toggle(true);
    $("#searched").toggle(false);
    $("#searchTable").toggle(false);
})

$("#clear").on("click", function () {
    database.ref().remove();
    $("#table-body").empty();
})