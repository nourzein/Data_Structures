# Assignment 10
## Goal: Create queries that will be used in the final web application.

### AA Meetings Map

My AA meetings web application will be a map of all aa meetings filtered by the day and time the person chooses. The filters will be drop down (I might change this to a form depending on what looks good/is more intiutive to use). 
After the filted data is displayed on the map (example: all meetings on Monday at 7:30), the person will be able to click on the icon on the map of his choice and see all the meetings happening during that time at that location in the side bar (this part will be front end work only since the intial query will include this data as well nested in the location).
This code is an example of a flitered day and time. I need the day and time to be dynamic, though. I have not gotten that far this week, however. 


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
            
The query is of all the information of each meeting at each location on day x start time y. The meetings are nested in the address because some have multiple per address. The side bar will show with with their info.            
            
### Dear Diary
The diary application will be a blog of my personal experience during the semester in my classes. I need to have a dynamic query that accesses each course, "topic" and displays the blog posts ordered by date. 
This example will show the blog posts for Data Structures only. It will need to be dynamic for the final though. 

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

### Temp Sensor 
The temperature sensor application will be a dynamic line graph displaying the trend of temperature over the days of the recordings. There will also be a daily clock displaying the temperatures of the hours in the day. They will be connected to each other. 
The query here I think is done. I need to send all the hour averages to the clock graph and the daily averages to the line graph to visualize. The interactive part will be front end javascript. I do need to figure out how send the data from two queries across. Right now, my daily data is commented out. 

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

