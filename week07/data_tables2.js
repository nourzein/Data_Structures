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
var address_AA06= fs.readFileSync('./geolocationResults06.json')
var addressesForDb = JSON.parse(address_AA06);

async.eachSeries(addressesForDb, function(value, callback) {
    // if (value.locationId !== 6001) return;
    // value.scheduleDetails.replace("'", "&apos;");
    const client = new Client(db_credentials);
    client.connect();
    var thisQuery = "INSERT INTO AAMeetings VALUES (E'" + value.address + "', '" + value.meetingName + "', '" + value.meetingInstances + "', '" + value.meetingTitle + "', '" + value.fullLocation + "',  '" + value.scheduleDetails + "', " + value.locationId + ", " + value.latitude + ", " + value.longitude + ");"; //how to get into the object here?
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    setTimeout(callback, 1000); 
    console.log(thisQuery)
});
