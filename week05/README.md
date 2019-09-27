# Assignment 5 NoSQL
## Goal: 
To use NoSQL to create a database of diary entries. 
I choose NoSQL to be my building block for my Dear_Diary database because I want the flexibility to change the data I input. I also only need to have a filter like date and topic to get my data out, data that is in the form of a diary entry. I am not interested in having a rigoursly broken down structure and avoid redundancy (I do not really HAVE redundancy since each entry will be different and unique). For this case, NoSQL just seems like the option to go. 

The way I will oragnize my data: 
![data structure Nosql schema](https://github.com/nourzein/Data_Structures/blob/master/week05/data_strcutures_NoSql_Schema.pdf)

## Process:
Step 1:Create a database in DynamoDB. 
I called mine Dear_Diary. I used topic as my partition key and date as my sort key. I knew I would have several entries with the same topic (most homework for each class, readings, events I go to) on several dates so it seemed intuitive. 

Step 2: Add all your dependencies and intall them!

    var async = require('async');
    var AWS = require('aws-sdk');
    AWS.config = new AWS.Config();
    AWS.config.region = "us-east-2";

    var dynamodb = new AWS.DynamoDB();

Step 3:Create your diary entries. 
It was tricky to assign the data structures to each entry. I kept date as a string because the code ran better that one. I prefered number but the way nosql handles date was confusing me. I obviously assigned string to entry and topic as well. I put them in an array.

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

    blogEntries.push(new BlogEntry("Data Structures Homework", 'September 26 2019', "diary entry")); //substituted 'diary entry' to reduce length of code
    blogEntries.push(new BlogEntry("Data Viz Homework", 'September 27 2019', "diary entry")); 
    blogEntries.push(new BlogEntry("Major Studio Homework", 'September 28 2019', "diary entry"));

Step 4: Populate your database with your entries
The code here is specific to DynamoDB. I used the starter code the professor gave and added an asyc function in order to run the code properly. A normal for loop I realized is way too fast for it to run the function the way I want it to (in order with each entry pushed after each other).
Note: The asyc function did not work for me without setting a callback function, even if the callback function was empty and did not have a set timeout. 

    var params = {};
    params.TableName = "Dear_Diary";


    async.eachSeries(blogEntries, function(value, callback) {
    params.Item = value;
    // console.log(params);
    dynamodb.putItem(params, function (err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
    setTimeout(callback, 2000); 

    }) 







