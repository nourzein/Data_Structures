{"filter":false,"title":"week04.4.js","tooltip":"/week04/week04.4.js","undoManager":{"mark":4,"position":4,"stack":[[{"start":{"row":0,"column":0},"end":{"row":20,"column":3},"action":"insert","lines":["const { Client } = require('pg');","","// AWS RDS POSTGRESQL INSTANCE","var db_credentials = new Object();","db_credentials.user = 'aaron';","db_credentials.host = 'dsdemo.c2g7qw1juwkg.us-east-1.rds.amazonaws.com';","db_credentials.database = 'mydb';","db_credentials.password = process.env.AWSRDS_PW;","db_credentials.port = 5432;","","// Connect to the AWS RDS Postgres database","const client = new Client(db_credentials);","client.connect();","","// Sample SQL statement to query the entire contents of a table: ","var thisQuery = \"SELECT * FROM aalocations;\";","","client.query(thisQuery, (err, res) => {","    console.log(err, res.rows);","    client.end();","});"],"id":1}],[{"start":{"row":2,"column":0},"end":{"row":8,"column":27},"action":"remove","lines":["// AWS RDS POSTGRESQL INSTANCE","var db_credentials = new Object();","db_credentials.user = 'aaron';","db_credentials.host = 'dsdemo.c2g7qw1juwkg.us-east-1.rds.amazonaws.com';","db_credentials.database = 'mydb';","db_credentials.password = process.env.AWSRDS_PW;","db_credentials.port = 5432;"],"id":2},{"start":{"row":2,"column":0},"end":{"row":7,"column":28},"action":"insert","lines":["var db_credentials = new Object();","db_credentials.user = 'nour'; //your username","db_credentials.host = process.env.WEB_HOST; //your endpoint","db_credentials.database = 'aa';","db_credentials.password = process.env.POSTGPW; //password. use an environment variable ","db_credentials.port = 5432; "]}],[{"start":{"row":2,"column":0},"end":{"row":11,"column":17},"action":"remove","lines":["var db_credentials = new Object();","db_credentials.user = 'nour'; //your username","db_credentials.host = process.env.WEB_HOST; //your endpoint","db_credentials.database = 'aa';","db_credentials.password = process.env.POSTGPW; //password. use an environment variable ","db_credentials.port = 5432; ","","// Connect to the AWS RDS Postgres database","const client = new Client(db_credentials);","client.connect();"],"id":3},{"start":{"row":2,"column":0},"end":{"row":13,"column":20},"action":"insert","lines":["// AWS RDS POSTGRESQL INSTANCE","var db_credentials = new Object();","db_credentials.user = 'nour'; //your username","db_credentials.host = process.env.WEB_HOST; //your endpoint","db_credentials.database = 'aa';","db_credentials.password = process.env.POSTGPW; //password. use an environment variable ","db_credentials.port = 5432; ","","// Connect to the AWS RDS Postgres database","const client = new Client(db_credentials);","client.connect();","console.log(client);"]}],[{"start":{"row":21,"column":3},"end":{"row":22,"column":0},"action":"insert","lines":["",""],"id":4},{"start":{"row":22,"column":0},"end":{"row":23,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":19,"column":28},"end":{"row":19,"column":29},"action":"remove","lines":["s"],"id":5},{"start":{"row":19,"column":27},"end":{"row":19,"column":28},"action":"remove","lines":["w"]},{"start":{"row":19,"column":26},"end":{"row":19,"column":27},"action":"remove","lines":["o"]},{"start":{"row":19,"column":25},"end":{"row":19,"column":26},"action":"remove","lines":["r"]},{"start":{"row":19,"column":24},"end":{"row":19,"column":25},"action":"remove","lines":["."]}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":23,"column":0},"end":{"row":23,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1569258879334,"hash":"4ac069f533e7025042a32a3a0405abe56111a970"}