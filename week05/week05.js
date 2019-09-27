var async = require('async');
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();
var blogEntries = [];

class BlogEntry {
  constructor(partitionKey, date, entry) {
    this.topic = {};
    this.topic.S = partitionKey;
    this.date = {}; 
    this.date.S = new Date(date).toDateString(); 
    this.entry = {};
    this.entry.S = entry;
  }
}

blogEntries.push(new BlogEntry("Data Structures Homework", 'September 26 2019', "I realized that data sctructes is the class I am learning the most in."));
blogEntries.push(new BlogEntry("Data Viz Homework", 'September 27 2019', "I am finding P5 more fun each week."));
blogEntries.push(new BlogEntry("Major Studio Homework", 'September 28 2019', "The qualitative assignmnet is harder for me to think about than the quant one."));

// blogEntries.push(new BlogEntry(3, 'September 25, 2019', "I taught my favorite students.", true, ["peas", "carrots"]));

// console.log(blogEntries); 



var params = {};
params.TableName = "Dear_Diary";


async.eachSeries(blogEntries, function(value, callback) {
params.Item = value;
console.log(params);
dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
setTimeout(callback, 2000);
}) 
 