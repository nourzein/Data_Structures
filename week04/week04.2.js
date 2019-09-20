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

var thisQuery = "CREATE TABLE aalocations (address varchar(100), lat double precision, long double precision);";


// Sample SQL statement to delete a table:
// var thisQuery = "DROP TABLE aalocations;"; 

client.query(thisQuery, (err, res) => {
    console.log(err, res);
    client.end();
});