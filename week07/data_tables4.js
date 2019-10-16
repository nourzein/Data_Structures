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
var myArray= []


for ( var i=0; i< addressesForDb.length; i++) {
    
    addressesForDb[i].meetingInstances.forEach(
        meeting=> 
        myArray.push(meeting)
        )
}
console.log(myArray);

        

//var meetingObjects= addressesForDb.map(elem => {
 //             return elem.meetingInstances });


async.eachSeries(myArray, function(value, callback) {
    // if (value.locationId !== 6001) return;
    // value.scheduleDetails.replace("'", "&apos;");
    const client = new Client(db_credentials);
    client.connect();
   
    var thisQuery = "INSERT INTO AAMeetingInstances VALUES (E'" + value.day + "', " + value.startTime + ", " + value.endTime + " , '" + value.meetingType + "',  '" + value.specialInterest + "', " + value.locationId + ");"; 
    client.query(thisQuery, (err, res) => {
         console.log(err, res);
        client.end();
     });
       
     setTimeout(callback, 1000); 
    console.log(thisQuery)
 });

// for (let i=0; i<meetings.length; i++) {
//     meetings[i]["locationId"]= id;
      
//  let meetingInstances = meetings[i].meetingInstances;
// //   console.log(id,meetingInstances);
//   for (let i=0;i<meetingInstances.length;i++) {
//       meetingInstances[i]["locationId"]=id;
//     //   console.log(id,meetingInstances[i])
    
 //. }