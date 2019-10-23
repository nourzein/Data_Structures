var request = require('request'); // npm install request
var async = require('async'); // npm install async
var fs = require('fs');
const dotenv = require('dotenv'); // npm install dotenv

// TAMU api key
dotenv.config();
const apiKey = process.env.API_KEY;


// geocode addresses
var meetingsData = [];
var addresses = require("./results06.json");
// console.log(addresses[0].address); 

// var geoAddress= addresses.map(elem => {
//     return elem.address
//      })


//eachSeries in the async module iterates over an array and operates on each item in the array in series

async.eachSeries(
  addresses,
  function(value, callback) {
    var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
        apiRequest += 'streetAddress=' + value.address.split(' ').join('%20');
        apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
        apiRequest += '&format=json&version=4.01';
        
    request(apiRequest, function(err, resp, body) {
        if (err) {throw err;}
        else {
            var tamuGeo = JSON.parse(body);
            // console.log(tamuGeo);
           value.latitude= +tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"];
           value.longitude= +tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"];
           
    //         // meetingsData.push({streetAddress: tamuGeo["InputAddress"]["StreetAddress"], City: tamuGeo["InputAddress"]["City"], Geocode: { Latitude: tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], Longitude: tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]}});
        //.push({Latitude: tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], Longitude: tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]});
    //          })
        }
        console.log(value.latitude, value.longitude)
    });
    
setTimeout(callback, 2000);
}, 


function() {
    fs.writeFileSync('geolocationResults06.json', JSON.stringify(addresses, null, 2));
    console.log('*** *** *** *** ***'); // simply to see theoutput well
    console.log('Number of meetings in this zone: ');
    console.log(addresses.length); // see how many meetings were done
}
);
 
 