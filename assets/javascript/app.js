// $(document).ready(function (){
// searchBtns();

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

$("#map").toggle(false);
// Initialize and show map in HTML
// var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: { lat: -33.92, lng: 151.25 }
    });

    var geocoder = new google.maps.Geocoder();

    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        console.log("Click works");

        $("#map").toggle(true);
        userLoc = $("#searchText").val().trim();
        console.log(userLoc);

        geocodeAddress(geocoder, map);
        deleteMarkers();
        $("#searchText").val("");

        database.ref().push({
            location: userLoc,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });

    });

    $("#searchText").on("keypress", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if (keycode == '13') {
            event.preventDefault();
            console.log("Enter Works");

            $("#map").toggle(true);
            userLoc = $("#searchText").val().trim();
            console.log(userLoc);

            geocodeAddress(geocoder, map);
            deleteMarkers();
<<<<<<< HEAD
            $("#locationInput").val("");


=======
            $("#searchText").val("");
            
>>>>>>> a9ec17e431d003eb8f9423cde48068606b673265
            database.ref().push({
                location: userLoc,
                dateAdded: firebase.database.ServerValue.TIMESTAMP
            });




        }
    });




    $.ajax({
        url: nasaURL,
        type: "GET",
        data: {
            "$limit": 25,
            "$$app_token": "uPRgN0kLB8vEkkQsOGe7M2weG"
        }
    })

        .then(function (response) {
            $("#searchResults").text(JSON.stringify(response));

            var infowindow = new google.maps.InfoWindow();

            var marker, i;

            for (i = 0; i < response.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(response[i].reclat, response[i].reclong),
                    map: map,
                    animation: google.maps.Animation.DROP,
                });

                google.maps.event.addListener(marker, 'click', (function (marker, i) {
                    return function () {
                        infowindow.setContent("<p>Name: " + response[i].name + "<br />" + "Mass: " + response[i].mass + " grams" + "<br />" + "Year Fell: " + response[i].year + "</p>");
                        infowindow.open(map, marker);
                    }
                })(marker, i));
            }

            $(".name").html("Name: " + name);
            // $(".yearFell").html("Meteor Fell: " + year);
            $(".mass").html("Mass (in grams): " + mass);

            console.log("Lat: " + lat);
            console.log("Long: " + long);
            console.log(response);
        });



};

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
            alert('Geocode was not successful for the following reason: ' + status);
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

    tabletimeConv =  moment(dateAdded).format("MM/DD/YYYY");

  
    
    
    //console.log(timeConv);
    // Employee Infos
    //console.log(tabletimeConv);
    //console.log(tableuserLoc);




    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(tabletimeConv),
        $("<td>").text(tableuserLoc),
    );

    // Append the new row to the table
    $("#searchTable > tbody").append(newRow);
});
// HOME PAGE //

// Paragraph On - Home


// Paragraph Off - After Searching

// $("p").toggle(1000, function()){
//     console.log("toggle paragraph");
// }


//
// ======================================
//

// SEARCH BAR & BUTTON //

// User types in the name of a place that they would like to pull up, or an address.


// User clicks on the search button


// var searchResult = $("#searchText").val();
// Here we grab the text from the input box

//
// ======================================
//

// SEARCH RESULTS //


// .then(function (response) {
//     $("#searchResults").text(JSON.stringify(response));

var mass = "https://data.nasa.gov/resource/y77d-th95.json?mass=";

var long = "https://data.nasa.gov/resource/y77d-th95.json?reclong=";

var lat = "https://data.nasa.gov/resource/y77d-th95.json?reclat=";

var nasaURL = "https://data.nasa.gov/resource/y77d-th95.json";


// // // // // // // // // // // // //

// Meterorite Landings within 'x' mile radius of the 'lag/long' or 'geolocation' of the place/address.

    //     // 1. Name of Meteorite
    //     $(".name").html("Name: " + name);

    //     // 2. Year fell Data
    //     $(".yearFell").html("Meteor Fell: " + year);

    //     // 3. Mass Data
    //     $(".mass").html("Mass (in grams): " + mass);

    //     // Meterorite Landings within 'x' mile radius of the 'lag/long' or 'geolocation' of the place/address.
    //     console.log("Lat: " + lat);
    //     console.log("Long: " + long);
    // });

//
// ======================================
//

// });