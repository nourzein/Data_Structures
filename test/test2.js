const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const handlebars = require('handlebars')
const fs = require('fs')
var express = require('express'), // npm install express
    app = express();
var path= require('path');
var bodyParser= require('body-parser')

var dir= __dirname;
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


//setup
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
app.use(express.static(path.join(dir, '/public')));
app.set('views', path.join(dir, 'public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

//route to render html file
app.get('/aa', function(req, res) {
    res.sendFile(dir +"/public/aa.html")
    //res.render("aa.html")
});
    
//route to query data
app.post('/aaData',  function(req, res) {
    //res.send('<h3>this is the page for my sensor data</h3>');  
    // Connect to the AWS RDS Postgres database
// var templateVariables= {};

const client = new Client(db_credentials);
client.connect();

var queryDay= req.body.queryDay
// var [from, to]=req.body.queryTime.split(",");
var queryTime= req.body.queryTime
//queryTime= req.body.queryTime

    var thisQuery = "SELECT latitude, longitude, address, json_agg(json_build_object('Meeting Name', meetingname, 'Meeting Title', meetingtitle, 'Day', day, 'Start Time', starttime,  'End Time', endtime, 'Metting Type', meetingtype, 'Special Interest', specialinterest, 'Address', fulllocation)) as meetings FROM aaallmeetings JOIN aaallmeetinginstances ON aaallmeetings.locationid = aaallmeetinginstances.locationid WHERE (1=1) " + queryDay +  queryTime + " GROUP BY latitude, longitude, address;";
    client.query(thisQuery, (err, results) => {
        if (err) {throw err}
        else {
            const data = results.rows;
            console.log(data)
              client.end();
              return res.json(data);
            // start leaflet js
            // fs.readFile('./aa.hbs', 'utf8', (error, myData) => {
            //     var template = handlebars.compile(myData, data)
            //     // console.log(templateVariables)
            //     templateVariables.blockofMeetings = data;
            //     templateVariables.myData = JSON.stringify(data);
            //     //console.log(templateVariables)
            //     var html = template(templateVariables)
            //     res.send(html)
            // })
        
        }
        
    });
});


app.post('/aaMeetings',  function(req, res) {

const client = new Client(db_credentials);
client.connect();

    var thisQuery = "SELECT latitude, longitude, address, json_agg(json_build_object('Meeting Name', meetingname, 'Meeting Title', meetingtitle, 'Day', day, 'Start Time', starttime,  'End Time', endtime, 'Metting Type', meetingtype, 'Special Interest', specialinterest, 'Address', fulllocation)) as meetings FROM aaallmeetings JOIN aaallmeetinginstances ON aaallmeetings.locationid = aaallmeetinginstances.locationid WHERE (1=1) GROUP BY latitude, longitude, address;";
    client.query(thisQuery, (err, results) => {
        if (err) {throw err}
        else {
            const data = results.rows;
            // console.log(data)
              client.end();
              return res.json(data);
        
        }
        
    });
});


app.get('/aaFullData',  function(req, res) {
    //res.send('<h3>this is the page for my sensor data</h3>');  
    // Connect to the AWS RDS Postgres database
// var templateVariables= {};

const client = new Client(db_credentials);
client.connect();

    var thisQuery = "SELECT DISTINCT latitude, longitude, address FROM aaallmeetings ;";
    client.query(thisQuery, (err, results) => {
        if (err) {throw err}
        else {
            const data = results.rows;
            // console.log(data)
              client.end();
              return res.json(data);
            // start leaflet js
            // fs.readFile('./aa.hbs', 'utf8', (error, myData) => {
            //     var template = handlebars.compile(myData, data)
            //     // console.log(templateVariables)
            //     templateVariables.blockofMeetings = data;
            //     templateVariables.myData = JSON.stringify(data);
            //     //console.log(templateVariables)
            //     var html = template(templateVariables)
            //     res.send(html)
            // })
        
        }
        
    });
});


// app.get('/sensor', function(req, res1) {
//     var templateVariables= { title: 'My Sensor Data', body: 'These are my temperatures in my room'};
//         //res.send('<h3>this is the page for my sensor data</h3>');  
        
//     // Connect to the AWS RDS Postgres database
//     const client = new Client(db_credentials);
//     client.connect();
    
//     var thisQuery = "SELECT * FROM sensorData;";
//     client.query(thisQuery, (err, res) => {
//         if (err) {throw err}
//         else {
            
//             fs.readFile('./sensor.html', 'utf8', (error, data) => {
//                 var template = handlebars.compile(data)
//                 //console.log(templateVariables)
//                 templateVariables.temperatures = res.rows;
//                 //console.log(templateVariables)
//                 var html = template(templateVariables)
//                 res1.send(html)
//             // //console.table(res.rows);
//             // var rows= JSON.stringify(res.rows)
//             // res1.send(`<p> Rows ${rows} </p>`); 
//             //
            
//             client.end();
//         });
//          client.end();
//         }
//     });

// });

//dear_diary query
app.get('/processBlog', function(req, res1) {
    
 var templateVariables= {};
 
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
    dynamodb.query(params, function(err, data2) {
      if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
      } else {
             
             fs.readFile('./pblog.hbs', 'utf8', (error, data) => {
                var template = handlebars.compile(data)
                //console.log(templateVariables)
                templateVariables.blogPost = data2.Items
                console.log(templateVariables)
                var html = template(templateVariables)
                res1.send(html)
            })
         
        // console.log("Query succeeded.");
        // res1.send(JSON.stringify(data.Items, null, 4));
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