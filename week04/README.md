# Assignment 4
Goal of this assignment: 
Create a database and create a table inside the database for addresses of AA meetings.

## Part 1: 
![skecth of schema](https://github.com/nourzein/Data_Structures/blob/master/week04/data_structures_schema.pdf)

I broke down my information into three boxes, the highest in the hierarchy is "address location", then we have "meeting name", and then "meeting information".
It seemed like an intiutive way, I just followed the breakdown of data in the actual web page itself.

## Part 2: 
We create tables in this section in the database that we already set up in AWS. 
An environmental variable is again used to hide the local host and password. --> load the dependecy for this again.
Specify the type of data being loaded: for street address, we use varchar(100)- we do not need more space, and for lat and long we use double percision instead of integer to avoid rounding.

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

## Part 3:
In this section we add data into our table using "INSERT INTO" query. This data comes from the week03 json file. 

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

## Part 4:
Check to see if the data created tables :

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
    // console.log(client);

    // Sample SQL statement to query the entire contents of a table: 
    var thisQuery = "SELECT * FROM aalocations;";

    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });


