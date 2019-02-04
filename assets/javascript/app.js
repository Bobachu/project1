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
var meteoriteLoc = [];


// Initialize and show map in HTML
var marker;

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: { lat: 59.325, lng: 18.070 }
    });

    marker = new google.maps.Marker({
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: { lat: 59.327, lng: 18.067 }
    });
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
    "$limit" : 5000,
    "$$app_token" : "uPRgN0kLB8vEkkQsOGe7M2weG"
  }
}).done(function(data) {
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
