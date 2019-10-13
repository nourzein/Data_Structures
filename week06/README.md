# Assignment 6

## Goal
Create queries for my SQL and NoSQL databses.

### Part 1: NoSQL

For the NoSQL query, I needed to change my pervious structuring of my dates in the table from toDateString to toLocaleString(). I realized this because looking at my table, the dates were being sorted weird. I still think I will change it in the future to toISOString() because it seems like that is the most full proof way. 

![table](https://github.com/nourzein/Data_Structures/blob/master/week06/NoSQL_table.png)

Doing so, I was ready to query from my NoSQL database for my data structures homework from last week (of course, not forgetting to install dependencies):

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
        data.Items.forEach(function(item) {
          console.log("***** ***** ***** ***** ***** \n", item);
        });
      }
    });

The query looks like so: 
![query NoSQL](https://github.com/nourzein/Data_Structures/blob/master/week06/noSQL_query.png)

### Part 2: SQL

For the SQL query, it was pretty straightforward, I just selected from my table a particular address using "SELECT address FROM aalocations WHERE address= '...'"
This is the code: 

    // Sample SQL statement to query meetings on Monday that start on or after 7:00pm: 
    var thisQuery = "SELECT address FROM aalocations WHERE address= '207 W 96TH ST New York NY ';";

    client.query(thisQuery, (err, res) => {
        if (err) {throw err}
        else {
            console.table(res.rows);
            client.end();
        }
    });

How did I know it was successful? See !
![SQL query](https://github.com/nourzein/Data_Structures/blob/master/week06/SQL.png)

### Reflections
I think it was a good idea to query my simple tables before having parsed my data because it gave me an idea of how I want my entire tables to look like while fixing the main table structures (such as how date is stored) without confusion. 
It was especially useful to see how the query treated dates in NOSQL because I would want to work with time data for SQL and have those numbers read properly... and so work needs to be done on hot just storing them as strings.




