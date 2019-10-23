// load dependencies
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
db_credentials.user = 'nour'; //your username
db_credentials.host = process.env.WEB_HOST; //your endpoint
db_credentials.database = 'aa';
db_credentials.password = process.env.POSTGPW; //password. use an environment variable 
db_credentials.port = 5432; 

// Connect to the AWS RDS Postgres database
const client = new Client(db_credentials);
client.connect();
console.log(client);

// Sample SQL statement to create a table: 


var thatQuery = `CREATE TABLE AAallMeetingInstances (day varchar(20), 
startTime int, 
endTime int, 
meetingType varchar(100), 
specialInterest varchar(100), 
locationId int);` ;

// Sample SQL statement to delete a table:
// var thisQuery = "DROP TABLE aalocations;"; 


client.query(thatQuery, (err, res) => {
    console.log(err, res);
    client.end(); 

});