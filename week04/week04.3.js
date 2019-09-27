// load in dependencies
const { Client } = require('pg');
var async = require('async');
const fs= require('fs')

//load in enviromental variable module
const dotenv = require('dotenv');
dotenv.config();

// create instance aalocations
var db_credentials = new Object();
db_credentials.user = 'nour'; //your username
db_credentials.host = process.env.WEB_HOST; //your endpoint
db_credentials.database = 'aa';
db_credentials.password = process.env.POSTGPW; //password. use an environment variable 
db_credentials.port = 5432; 

//load in JSON file. Parse it to be able to use it.
var address_AA06= fs.readFileSync('./week03/AA06.json')
var addressesForDb = JSON.parse(address_AA06);

console.log(addressesForDb);// check how it looks--> good!

// add lat long and address inside database table "aalocations"
async.eachSeries(addressesForDb, function(value, callback) {
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO aalocations VALUES (E'" + value.streetAddress + "', " + value.Geocode.Latitude + ", " + value.Geocode.Longitude + ");";
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
}); 

