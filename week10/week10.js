//console.log("test")
const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const moment = require('moment-timezone');
var express = require('express'), // npm install express
    app = express();

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


app.get('/', function(req, res) {
  res.send(`<h1>Data Structures Final Assignments</h1>
  <ul><li><a href="/sensor"> Please look at my sensor data. </a></li>
  <li><a href="/aa">Please look at my aa data. </a></li>
  <li><a href="/processBlog">Please look at my process blog data.</a></li></ul>`)
  ;
});

// I will created a line graph for the months recorded, the unit will be days, so I need to query based on an average of each day. If time allows I also want to create a visual of each day, with avergaes of all the minutes in an hour. 
//TL DR My web application will need the month, the day, and the hour temperature averages 
app.get('/sensor', function(req, res1) {
        //res.send('<h3>this is the page for my sensor data</h3>');  
        
    // Connect to the AWS RDS Postgres database
    const client = new Pool(db_credentials);
    client.connect();
    
    var thisQueryHour = "SELECT EXTRACT(MONTH FROM sensorTime) as sensormonth, EXTRACT(DAY FROM sensorTime) as sensorday, EXTRACT(HOUR FROM sensorTime) as sensorhour, AVG(sensorValue::int) as num_obs FROM sensorData GROUP BY sensormonth, sensorday, sensorhour ORDER BY sensormonth, sensorday, sensorhour;";
    client.query(thisQueryHour, (err, res) => {
        if (err) {throw err}
        else {
            //console.table(res.rows);
            var finalData= JSON.stringify(res.rows)
            res1.send(`<p> My data divided as the average temperature at every hour of every day of every month it has been recording ${finalData} </p>`); 
            client.end();
        }
    });
//   var thisQueryDay = "SELECT EXTRACT(MONTH FROM sensorTime) as sensormonth, EXTRACT(DAY FROM sensorTime) as sensorday, AVG(sensorValue::int) as num_obs FROM sensorData GROUP BY sensormonth, sensorday ORDER BY sensormonth, sensorday;";
//     client.query(thisQueryDay, (err, res) => {
//         if (err) {throw err}
//         else {
//             //console.table(res.rows);
//             var finalData2= JSON.stringify(res.rows)
//             res1.send(`<p> My data divided as the average temperature at every day of every month it has been recording ${finalData2} </p>`); 
//             client.end();
//         }
//     });
});


//My app will use a day and time query. This query is to Mondays at 7:30, but the for the final I will make it dynamic based on buttons pressed on the app (that is why I have the variable queryData, but never got around to creating it this week).
app.get('/aa', function(req, res1) {
    //not used yet- but will include in query for final
    var queryDay= 'Mondays'
    // Connect to the AWS RDS Postgres database
        const client = new Pool(db_credentials);
        client.connect();
          var thisQuery = "SELECT latitude, longitude, address, json_agg(json_build_object('Meeting Name', meetingname, 'Meeting Title', meetingtitle, 'Day', day, 'Start Time', starttime,  'End Time', endtime, 'Metting Type', meetingtype, 'Special Interest', specialinterest, 'Address', fulllocation)) as meetings FROM aaallmeetings JOIN aaallmeetinginstances ON aaallmeetings.locationid = aaallmeetinginstances.locationid WHERE day= 'Mondays' AND starttime= 730 GROUP BY latitude, longitude, address;";
                                client.query(thisQuery, (err, res) => {
                                    if (err) {throw err}
                                    else {
                                        console.table(res.rows);
                                        var filteredData= JSON.stringify(res.rows)
                                        res1.send(`<p> Meetings on Mondays at 7:30 in the morning ${filteredData} </p>`); 
                                        client.end();
                                    }
                                });
                            });    


//dear_diary query will be for each topic once the topic is clicked. Right now it is for Data Structures, but for the final it will be dynamic based on buttons I have created.
app.get('/processBlog', function(req, res1) {

//was variable not used- will be used for a dynamic query for final project
var dynamicTopic= 'Data Structures'

//Set up query 
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
 
 //run query   
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