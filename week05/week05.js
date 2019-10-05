var async = require('async');
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();
var blogEntries = [];

class BlogEntry {
  constructor(partitionKey, dt, entry) {
    this.topic = {};
    this.topic.S = partitionKey;
    this.dt = {}; 
    this.dt.S = new Date(dt).toDateString(); 
    this.entry = {};
    this.entry.S = entry;
  }
}

blogEntries.push(new BlogEntry("Data Structures Homework", 'September 26 2019', "The data structures assignment this week was straightforward. I experimented with the asyc. function to produce a loop that has a wait time to execute the putItem command. It feels amazing after finishing each time (and feels excrutiating while doing it!). I def feel like the data structures assignments help me with projects in other classes too, especially major stuio work."));
blogEntries.push(new BlogEntry("Data Viz Homework", 'September 27 2019', "I am finding P5 more fun each week. The pressure of doing 3 clocks each assignment takes away from the fun of it, and I also find it splits up my time so that I cannot produce compelling visuals \"quantity versus quality\". That has definitely been frusttating at the beginng but as I get used to p5, I am becoming faster, and even though I still am not producing work that would be as good as if I had to focus only on one or two pieces, it is become manageable. "));
blogEntries.push(new BlogEntry("Major Studio Homework", 'September 28 2019', "While doing my Major Studio quantitative project, I realized that data sctructes is the class I am using the most outside of the \"classroom\". Right now, the qualitative assignmnet is harder for me to think about than the quant one. I am thinking of diving into the context of the Islamic Art aquisition and producing a timeline based on that. I hope this story turns out meaningful!"));


var params = {};
params.TableName = "Dear_Diary";


async.eachSeries(blogEntries, function(value, callback) {
params.Item = value;
// console.log(params);
dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
setTimeout(callback, 2000); //found out you do not need it, use for larger sets?

}) 
 