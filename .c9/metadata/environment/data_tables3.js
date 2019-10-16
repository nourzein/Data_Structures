{"filter":false,"title":"data_tables3.js","tooltip":"/data_tables3.js","undoManager":{"mark":9,"position":9,"stack":[[{"start":{"row":0,"column":0},"end":{"row":48,"column":6},"action":"insert","lines":["// load dependencies","const { Client } = require('pg');","const dotenv = require('dotenv');","dotenv.config();","","// AWS RDS POSTGRESQL INSTANCE","var db_credentials = new Object();","db_credentials.user = 'nour'; //your username","db_credentials.host = process.env.WEB_HOST; //your endpoint","db_credentials.database = 'aa';","db_credentials.password = process.env.POSTGPW; //password. use an environment variable ","db_credentials.port = 5432; ","","// Connect to the AWS RDS Postgres database","const client = new Client(db_credentials);","client.connect();","console.log(client);","","// Sample SQL statement to create a table: ","","var thisQuery = `CREATE TABLE AAMeetings (address varchar(100), ","meetingName varchar(100), ","meetingTitle varchar(100), ","fullLocation varchar(150), ","scheduleDetails varchar(150), ","locationId int,","latitude double precision, ","longitude double precision);`;","","// var thatQuery = `CREATE TABLE AAMeetingInstances (day varchar(20), ","// startTime int, ","// endTime int, ","// meetingType varchar(100), ","// specialInterest varchar(100), ","// locationId int);`;","","// Sample SQL statement to delete a table:","// var thisQuery = \"DROP TABLE aalocations;\"; ","","client.query(thisQuery, (err, res) => {","    console.log(err, res);","    client.end();","});","","// client.query(thatQuery, (err, res) => {","//     console.log(err, res);","//     client.end(); ","","// });"],"id":1}],[{"start":{"row":20,"column":0},"end":{"row":27,"column":30},"action":"remove","lines":["var thisQuery = `CREATE TABLE AAMeetings (address varchar(100), ","meetingName varchar(100), ","meetingTitle varchar(100), ","fullLocation varchar(150), ","scheduleDetails varchar(150), ","locationId int,","latitude double precision, ","longitude double precision);`;"],"id":2},{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":21,"column":0},"end":{"row":21,"column":3},"action":"remove","lines":["// "],"id":3},{"start":{"row":22,"column":0},"end":{"row":22,"column":3},"action":"remove","lines":["// "]},{"start":{"row":23,"column":0},"end":{"row":23,"column":3},"action":"remove","lines":["// "]},{"start":{"row":24,"column":0},"end":{"row":24,"column":3},"action":"remove","lines":["// "]},{"start":{"row":25,"column":0},"end":{"row":25,"column":3},"action":"remove","lines":["// "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":3},"action":"remove","lines":["// "]}],[{"start":{"row":31,"column":0},"end":{"row":35,"column":0},"action":"remove","lines":["client.query(thisQuery, (err, res) => {","    console.log(err, res);","    client.end();","});",""],"id":4}],[{"start":{"row":32,"column":0},"end":{"row":32,"column":3},"action":"remove","lines":["// "],"id":5},{"start":{"row":33,"column":0},"end":{"row":33,"column":3},"action":"remove","lines":["// "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":3},"action":"remove","lines":["// "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":3},"action":"remove","lines":["// "]}],[{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"insert","lines":["\\"],"id":6},{"start":{"row":26,"column":19},"end":{"row":26,"column":20},"action":"insert","lines":["\\"]}],[{"start":{"row":26,"column":19},"end":{"row":26,"column":20},"action":"remove","lines":["\\"],"id":7},{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"remove","lines":["\\"]},{"start":{"row":26,"column":17},"end":{"row":26,"column":18},"action":"remove","lines":[";"]}],[{"start":{"row":26,"column":17},"end":{"row":26,"column":18},"action":"insert","lines":[" "],"id":8},{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"insert","lines":[":"]}],[{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"remove","lines":[":"],"id":9}],[{"start":{"row":26,"column":18},"end":{"row":26,"column":19},"action":"insert","lines":[";"],"id":10}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":30,"column":0},"end":{"row":30,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":0,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1571180035913,"hash":"d3d47075061a7860341592c4709ccfc6f54ff444"}