// npm install aws-sdk
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();

var params = {
    TableName : "Dear_Diary",
    KeyConditionExpression: "#tp = :topicName and dt between :minDate and :maxDate", // the query expression
    ExpressionAttributeNames: { // name substitution, used for reserved words in DynamoDB
        "#tp" : "topic"
    },
    ExpressionAttributeValues: { // the query values
        ":topicName": {S: "Homework"},
        ":minDate": {S: new Date("September 26 2019").valueOf().toString()},
        ":maxDate": {S: new Date("September 28 2019").valueOf().toString()}
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