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


let zones = ['01','02','03','04','05','06','07','08','09','10']


async.eachSeries(zones, 
function(value, callback) {  
let addressesForDb = JSON.parse(fs.readFileSync('./geofile/AA' + value + '.json'));
let myArray=[]
        for ( var i=0; i< addressesForDb.length; i++) {
            addressesForDb[i].meetingInstances.forEach(
                meeting=> 
                myArray.push(meeting)
                )
        }
                async.eachSeries(myArray, function(value, callback) {
                    const client = new Client(db_credentials);
                    client.connect();
                    var thisQuery = "INSERT INTO AAallMeetingInstances VALUES (E'" + value.day + "', " + value.startTime + ", " + value.endTime + " , '" + value.meetingType + "',  '" + value.specialInterest + "', " + value.locationId + ");"; 
                    client.query(thisQuery, (err, res) => {
                         console.log(err, res);
                        client.end();
                     });
                     setTimeout(callback, 1000); 
                    console.log(thisQuery)
                 });
        
setTimeout(callback, 3000); 
});