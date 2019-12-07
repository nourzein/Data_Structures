const { Client } = require('pg');
const dotenv = require('dotenv');
dotenv.config();
const handlebars = require('handlebars')
const fs = require('fs')
var express = require('express'), // npm install express
    app = express();
var path= require('path');
var bodyParser= require('body-parser')

const { format, parseISO } =require('date-fns')

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


const indexSource = fs.readFileSync("public/sensor.hbs").toString();
var template = handlebars.compile(indexSource, { strict: true });

//setup paths 
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
    const client = new Client(db_credentials);
    client.connect();

//variables for dynamic query
var queryDay= req.body.queryDay
// var [from, to]=req.body.queryTime.split(",");
var queryTime= req.body.queryTime

    var thisQuery = "SELECT latitude, longitude, address, json_agg(json_build_object('Meeting Name', meetingname, 'Meeting Title', meetingtitle, 'Day', day, 'Start Time', starttime,  'End Time', endtime, 'Meeting Type', meetingtype, 'Special Interest', specialinterest, 'Address', fulllocation)) as meetings FROM aaallmeetings JOIN aaallmeetinginstances ON aaallmeetings.locationid = aaallmeetinginstances.locationid WHERE (1=1) " + queryDay +  queryTime + " GROUP BY latitude, longitude, address;";
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

//request for default view of map with only lat and long
app.get('/aaFullData',  function(req, res) {
    
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
        }
    });
});


app.get('/sensor', function(req, res1) {
    //var templateVariables= { title: 'My Sensor Data', body: 'These are my temperatures in my room'};
         
        
    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();
    
  var thisQuery = "SELECT EXTRACT(MONTH FROM sensorTime) as sensormonth, EXTRACT(DAY FROM sensorTime) as sensorday, EXTRACT(HOUR FROM sensorTime) as sensorhour, AVG(sensorValue::int) as num_obs FROM sensorData GROUP BY sensormonth, sensorday, sensorhour ORDER BY sensormonth, sensorday, sensorhour;";;
    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
              res1.send(template({ sensordata: JSON.stringify(res.rows)}));
            client.end();
            console.log('1) responded to request for sensor graph');
            // fs.readFile('./sensor.html', 'utf8', (error, data) => {
            //     var template = handlebars.compile(data)
            //     //console.log(templateVariables)
            //     templateVariables.temperatures = res.rows;
            //     //console.log(templateVariables)
            //     var html = template(templateVariables)
            //     res1.send(html)
                                // // //console.table(res.rows);
                                // // var rows= JSON.stringify(res.rows)
                                // // res1.send(`<p> Rows ${rows} </p>`); 
                                // //
     // client.end();
    // });
         client.end();
        }
    });

});
  
 app.get('/dd', function(req, res1) {
 var templateVariables= {}; 
 templateVariables.blogpost = [];
 var topic = 'Data Structures Homework' // default category
 var date;
 var entry;
 
  if (req.query.topic){
    topic = req.query.topic
  }
  console.log(topic)
 
    var params = {
        TableName : "Dear_Diary2",
        KeyConditionExpression: 
        "#tp = :topicName and dt between :minDate and :maxDate", // the query expression
        ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
            "#tp" : "topic"
        },
        ExpressionAttributeValues: { // the query values
            ":topicName": { S: topic},
            ":minDate": {S: new Date("August 28, 2019").toISOString()},
            ":maxDate": {S: new Date("November 11, 2019").toISOString()}
        }
    };
    
     dynamodb.query(params, function(err, data2) {
      if (err) {
          console.log('there was an error')
      } else {
         //res.send(data)
        data2.Items.forEach(function(item){
            
        templateVariables.blogpost.push({'topic':item.topic.S, 'title':item.title.S, 'date':format(parseISO(item.dt.S), 'MM/dd/yyyy'), 'entry':item.entry.S});
        })
          
          fs.readFile('./dd.hbs', 'utf8', (error, data) => {
                var template = handlebars.compile(data)
                //console.log(templateVariables)
                console.log(templateVariables)
                var html = template(templateVariables)
                res1.send(html)
            })
      }
  });
 
});

// serve static files in /public
app.use(express.static('public'));

//if not found
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});

// listen on port 8080
app.listen(8080, function() {
    console.log('Server listening...');
});