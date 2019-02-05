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
var meteoriteLoc = [];

$("#map").toggle(false);
// Initialize and show map in HTML
// var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: { lat: -33.92, lng: 151.25 }
    });

    var geocoder = new google.maps.Geocoder();

    $("#searchButton").on("click", function (event) {
        event.preventDefault();
        console.log("Click works");

        $("#map").toggle(true);
        userLoc = $("#searchText").val().trim();
        console.log(userLoc);
       
        // searchBtns();
        geocodeAddress(geocoder, map);
        $("#locationInput").val("");


    });

    $("#searchText").on("keypress", function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);

        if(keycode == '13'){
        event.preventDefault();
        console.log("Enter Works");

        $("#map").toggle(true);
        userLoc = $("#searchText").val().trim();
        console.log(userLoc);
       
        // searchBtns();
        geocodeAddress(geocoder, map);
        $("#locationInput").val("");


    }});



    // function searchBtns(){
    //     var userLoc = "";
    //     userLoc.push(searchBtn);
    // }


        database.ref().push({
            location: userLoc,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
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
                        infowindow.setContent(response[i][0]);
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

    

    for(var i=0; i<=nasaData.length; i++){
        var mypos = new google.maps.LatLng(nasaData[i].lat, stops[i].long);
        var marker = new google.maps.Marker({
         position: mypos,
         map: map,
         title: nasaData[i].name
        });
}};

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
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    // Store everything into a variable.
    var metLoc = childSnapshot.val().locationInput;
    var timeconv = childSnapshot.val().name;


    console.log(metLoc);
    console.log(timeconv);

    // Create the new row
    var newRow = $("<tr>").append(
        $("<td>").text(metLoc),
        $("<td>").text(timeconv),

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