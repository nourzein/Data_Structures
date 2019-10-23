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

var thisQuery = `CREATE TABLE aaallmeetings (address varchar(100), 
meetingName varchar(100), 
meetingTitle varchar(100), 
fullLocation varchar(150), 
scheduleDetails varchar(350), 
locationId int,
latitude double precision, 
longitude double precision);`;


// Sample SQL statement to delete a table:
// var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});