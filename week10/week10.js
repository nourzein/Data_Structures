//console.log("test")
const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

//Configure Photon
var device_id = process.env.PHOTON_ID;
var access_token = process.env.PHOTON_TOKEN;
var particle_variable = 'tempsensor';
var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;
    
// AWS RDS POSTGRESQL INSTANCE
var db_credentials = new Object();
    db_credentials.user = 'nour'; //your username
    db_credentials.host = process.env.WEB_HOST; //your endpoint
    db_credentials.database = 'aa';
    db_credentials.password = process.env.POSTGPW; //password. use an environment variable 
    db_credentials.port = 5432; 

//DB CONFIG
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";
var dynamodb = new AWS.DynamoDB();    

// //Install Express
var express = require('express'), // npm install express
    app = express();

app.get('/', function(req, res) {
  res.send(`<h1>Data Structures Final Assignments</h1>
  <ul><li><a href="/sensor"> Please look at my sensor data. </a></li>
  <li><a href="/aa">Please look at my aa data. </a></li>
  <li><a href="/processBlog">Please look at my process blog data.</a></li></ul>`)
  ;
});

app.get('/sensor', function(req, res1) {
        //res.send('<h3>this is the page for my sensor data</h3>');  
        
    // Connect to the AWS RDS Postgres database
    
    const client = new Client(db_credentials);
    client.connect();
    
    var thisQuery = "SELECT * FROM sensorData;";
    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
            //console.table(res.rows);
            var rows= JSON.stringify(res.rows)
            res1.send(`<p> Rows ${rows} </p>`); 
            client.end();
        }
    });

});

app.get('/aa', function(req, res1) {
    //res.send('<h3>this is the page for my sensor data</h3>');  
    
// Connect to the AWS RDS Postgres database

    const client = new Client(db_credentials);
    client.connect();
    
    var thisQuery = "SELECT COUNT(*) FROM aaallmeetinginstances;";
    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
            var rowCount= JSON.stringify(res.rows)
            res1.send(`<p> Rows ${rowCount} </p>`); 
            client.end();
        }
    });
});

//dear_diary query
app.get('/processBlog', function(req, res1) {

    var params = {
        TableName : "Dear_Diary",
        KeyConditionExpression: 
        "#tp = :topicName and dt between :minDate and :maxDate", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp" : "topic"
        },
        ExpressionAttributeValues: { // the query values
            ":topicName": { S: "Data Structures Homework"},
            ":minDate": {S: new Date("September 26, 2019").toLocaleString()},
            ":maxDate": {S: new Date("September 28, 2019").toLocaleString()}
        }
    };
    
    dynamodb.query(params, function(err, data) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
        console.log("Query succeeded.");
        res1.send(JSON.stringify(data.Items, null, 4));
        // .forEach(function(item) {
        //   console.log("***** ***** ***** ***** ***** \n", item);
        // });
      }
    });

});

 

// serve static files in /public
app.use(express.static('public'));

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});