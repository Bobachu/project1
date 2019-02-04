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

var meteoriteLoc = [
    ['Bondi Beach', -33.890542, 151.274856, 4],
    ['Coogee Beach', -33.923036, 151.259052, 5],
    ['Cronulla Beach', -34.028249, 151.157507, 3],
    ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    ['Maroubra Beach', -33.950198, 151.259302, 1]
];


// Initialize and show map in HTML
var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: -33.92, lng: 151.25 }
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: { lat: -33.92, lng: 151.25 }
    });

    var infowindow = new google.maps.InfoWindow();

    var marker, i;

    for (i = 0; i < meteoriteLoc.length; i++) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(meteoriteLoc[i][1], meteoriteLoc[i][2]),
            map: map,
            animation: google.maps.Animation.DROP,
        });

        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                infowindow.setContent(meteoriteLoc[i][0]);
                infowindow.open(map, marker);
            }
        })(marker, i));
    }

}



// HOME PAGE //

// Paragraph On - Home

// Paragraph Off - After Searching

//
// ======================================
//

// SEARCH BAR & BUTTON //

// User types in the name of a place that they would like to pull up, or an address.

// User clicks on the search button
$("#submit").on("click", function(){
 console.log("Click works");

});
//
// ======================================
//

// SEARCH RESULTS //

// Meterorite Landings within 'x' mile radius of the 'lag/long' or 'geolocation' of the place/address.

// Meteorites that are nearby will have their information toggled on pins on Google Maps
// ------------- If not the information will be populated in a container beneath the search bar & map

var nasaURL = "https://data.nasa.gov/resource/y77d-th95.json";

$.ajax({
    url: nasaURL,
    type: "GET",
    data: {
        "$limit": 5000,
        "$$app_token": "uPRgN0kLB8vEkkQsOGe7M2weG"
    }
}).done(function (data) {
    alert("Retrieved " + data.length + " records from the dataset!");
    console.log(data);
});

// 1. Type of Meteorite Data

// 2. Year fell Data

// 3. Mass Data

//
// ======================================
//

// TOGGLE MAP ON/OF //

// Map Off - Home page

// Map On - After searching

//
// ======================================
//

// SAVE SEARCHES //

// Allow users to save their searches in the side navbar (if possible on front end)
// Searches are saved in Firebase....

// Side Navbar toggle off

// Side Navbar toggle on
