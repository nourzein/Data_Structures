# Assignment 6

## Goal
Create queries for my SQL and NoSQL databses.

NoSQL:
For the NoSQL query, I needed to change my pervious structuring of my dates in the table from toDateString to toLocaleString(). I realized this because looking at my table, the dates were being sorted weird. I still think I will change it in the future to toISOString() because it seems like that is the most full proof way. 
Table: 
![table](https://github.com/nourzein/Data_Structures/blob/master/week06/NoSQL_table.png)

Doing so, I was ready to query from my NoSQL database for my data structures homework from last week (of course, not forgetting to install dependencies):

    var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-2";

    var dynamodb = new AWS.DynamoDB();

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




