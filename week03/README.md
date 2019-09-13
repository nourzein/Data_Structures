# Assignment3

## Goal

1. To set an environmental variable using dotenv and store secret API information.
2. To use the API key and week02 json file with addresses and retrieve coordinate information- this will be done using asyc and setTimeout functions.
3. To save coordinate information along with address inforamtion as objects inside arrays. 

## Steps

1. Install dependencies:

        //dependencies
        var request = require('request'); // npm install request
        var async = require('async'); // npm install async
        var fs = require('fs');
        const dotenv = require('dotenv'); // npm install dotenv

2. Create environmental variable "env" and save it using the terminal command: mkdir .env ("." signifies privacy). 

3. Add API key information to the private env file.

4. Create another private file called .gitignore to put the env file in- in order to have github ignore it.

5. Configure API key and give it a name, mine= API_KEY. It is common practice to name it in all caps.

        // TAMU api key
        dotenv.config();
        const apiKey = process.env.API_KEY;

6. Create meeting array where addresses and geocoordinates will be stored. Bring forth the address json file from week2 using the 'require' function.

        // geocode addresses
        var meetingsData = [];
        var addresses = require("./week02/results.json");
        console.log(addresses[0]); //. to check that the require function worked
  
 7. Create functions, using asyc to slow down the process, to make information requests to [Texas A&M Geoservices Geocoding APIs](http://geoservices.tamu.edu/Services/Geocode/WebService/) for each address, using .eachSeries method in asyc. 
 
         async.eachSeries(
          addresses,
          function(value, callback) {
            var apiRequest = 'https://geoservices.tamu.edu/Services/Geocode/WebService/GeocoderWebServiceHttpNonParsed_V04_01.aspx?';
                apiRequest += 'streetAddress=' + value.split(' ').join('%20');
                apiRequest += '&city=New%20York&state=NY&apikey=' + apiKey;
                apiRequest += '&format=json&version=4.01';
8. Still within asyc, create a function to store the output as objects in the meetingsData array. This is done using ".push" To insure it gets executed in a proper sequence within itself, use setTimeout to call it every 2000.

        request(apiRequest, function(err, resp, body) {
                if (err) {throw err;}
                else {
                    var tamuGeo = JSON.parse(body);
                    console.log(tamuGeo);
                    meetingsData.push({streetAddress: tamuGeo["InputAddress"]["StreetAddress"], City: tamuGeo["InputAddress"]["City"], Geocode: { Latitude: tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Latitude"], Longitude: tamuGeo["OutputGeocodes"][0]["OutputGeocode"]["Longitude"]}});
                }
            });
            setTimeout(callback, 2000);
        }, 
 
 9. Still within asyc, create a function to save the output into a json file: 
 
         function() {
            fs.writeFileSync('AA06.json', JSON.stringify(meetingsData));
            console.log('Number of meetings in this zone: ');
            console.log(meetingsData.length); // see how many meetings were done
        });
 
