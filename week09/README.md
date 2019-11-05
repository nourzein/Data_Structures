# Assignment 9: Temperature Sensor

##Goal: 
Create table for temperature sensor project.

##Process:
First, create a table for my temperature sensor information using SQL. I have two columns, one for temperature data and one for time it was taken. 

    // Connect to the AWS RDS Postgres database
    const client = new Client(db_credentials);
    client.connect();
    console.log(client);
    // Sample SQL statement to create a table: 
    var thisQuery = "CREATE TABLE sensorData ( sensorValue double precision, sensorTime timestamp DEFAULT current_timestamp );";
    // Sample SQL statement to delete a table:
    // var thisQuery = "DROP TABLE aalocations;"; 
    client.query(thisQuery, (err, res) => {
        console.log(err, res);
        client.end();
    });
    
Next, set up a script to run the query to insert data into my table continuously. To do so I change the EC2 instance setting of "stop environment" to "Never".

Next, write script to insert data into tables (that will run continuously). In this script, an API request must be made (to the temperature sensor data) and insert data into the table. 
Set up credentials to connect to particle API

    var device_id = process.env.PHOTON_ID;
    var access_token = process.env.PHOTON_TOKEN;
    var particle_variable = 'tempsensor';
    var device_url = 'https://api.particle.io/v1/devices/' + device_id + '/' + particle_variable + '?access_token=' + access_token;

Set up credentials of SQL database

    var db_credentials = new Object();
    db_credentials.user = 'nour'; //your username
    db_credentials.host = process.env.WEB_HOST; //your endpoint
    db_credentials.database = 'aa';
    db_credentials.password = process.env.POSTGPW; //password. use an environment variable 
    db_credentials.port = 5432; 

Use 'request' module to request temperature data in one minute intervals. Store the data in a variable called sv. Make sure to parse the data that is back from the request into something the program can read.

Write information back into SQL table using getAndWriteData function.

    var getAndWriteData = function() {
        
        // Make request to the Particle API to get sensor values
        request(device_url, function(error, response, body) {
            
            // Store sensor value(s) in a variable
            var sv = JSON.parse(body).result;
            
            // Convert 1/0 to TRUE/FALSE for the Postgres INSERT INTO statement
            var sv_mod; 
          console.log(sv); 
    //         // Connect to the AWS RDS Postgres database
            const client = new Client(db_credentials);
            client.connect();
            // Construct a SQL statement to insert sensor values into a table
            var thisQuery = "INSERT INTO sensorData VALUES (" + sv + ", DEFAULT);";
            console.log(thisQuery); // for debugging

        // Connect to the AWS RDS Postgres database and insert a new row of sensor values
        client.query(thisQuery, (err, res) => {
            console.log(err, res);
            client.end();
        });
      });
    };
    // // write a new row of sensor data every five minutes
    setInterval(getAndWriteData, 60000);
