# Assignment1

This is [Assignemnt 1](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_01.md) for Data Structures. Goal: Using Node.JS on AWS command line, request ten AA meeting locations in Manhattan and save them in local environment as text files. 
Techniques used: 
         1. Node 'Request' module 
         2. Node 'Fs' module
         3. For loop using 'let' to declare variable instead of var (see [link](https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var) for reasoning)                             

Code give for the 'require' and 'fs' modules: 

         // npm install request
         // mkdir data

         var request = require('request');
         var fs = require('fs');

         request('https://parsons.nyc/thesis-2019/', function(error, response, body){
             if (!error && response.statusCode == 200) {
                 fs.writeFileSync('/home/ec2-user/environment/data/thesis.txt', body);
             }
             else {console.log("Request failed!")}
         });
1. Must run the npm install request (as seen above):
         
         
         var request = require('request');
         var fs = require('fs');
        

2. Define our variable, that will be useful to cut out URL name repetition:
         
         var zone= ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];
         
It would be good for the future to run a function for this variable to generate sequential numbers from 1-10 instead of writing the numbers out.

3. Create a for loop in order to run out 'request' and 'fs' functions the length of times we want:
         
         for  (let i = 0; i < zone.length; i++) 
 
4. Add the extraction function inside the for loop:

         for  (let i = 0; i < zone.length; i++) 
         {
           request('https://parsons.nyc/aa/m' + zone[i] + '.html', function(error, response, body){
             if (!error && response.statusCode == 200) {
                 fs.writeFileSync('/home/ec2-user/environment/data/' + 'AA'+ zone[i] + '.txt', body);
             }
             else {console.log("Request failed!")}
           });
         }

The 'let' variable declaration was used instead of the 'var' variable declaration because the var declaration would run the first 'request' function much faster than the file extraction and save can handle. The difference between the 'let' and 'var' declations is well explained [here](https://stackoverflow.com/questions/762011/whats-the-difference-between-using-let-and-var): "The difference is scoping. var is scoped to the nearest function block and let is scoped to the nearest enclosing block, which can be smaller than a function block. Both are global if outside any block". 

Things to keep in mind:
         
         1. Path directories are very important and easy to mess up the extraction. Make sure you know where you are saving            the files and write that accordingly.
         
         2. For loops are very useful and time saving once set up properly- worth the investment of creating one. 
         
         3. Node.js is not present automatically unless the interface you are working on has one. Make sure you have it before attempting the code. 




  
=======
# Assignment2

This is [Assignment 2](https://github.com/visualizedata/data-structures/blob/master/weekly_assignment_02.md) for Data Structures. The goal is to use Node.js to extract important information such as addresses from the text files (a single text file for this week) and store them in an organized and accessible way for later use. 
We need two dependencies: 
* [Cheerio](https://www.npmjs.com/package/cheerio)
* [fs](https://nodejs.org/api/fs.html)

Load the dependencies: 

    var fs = require('fs');
    var cheerio = require('cheerio');

Load the AA meeting text file of desired zone (mine is 06) into a variable:

    var content = fs.readFileSync('week01/AA06.txt');

Load the content of the AA06 text file into cheerios and put it in a variable:

    var $ = cheerio.load(content);

Declare variable with addresses put into an array:

    var address= [];

Find the position of the addresses on the html file using web developer tools. 
The addresses in my file where located in the 3rd paragaph, the "children" of the 3rd "tbody".
In order to call them specifically, we need to get into the "children", the tr tags, of the "first" "children", the td tags, each time. 

     $('tbody tbody tbody').each(function(i, elem) {
    
    address[i] = $(elem).children().children().first().html().split("<br>")[2].split(",")[0].split(".")[0].trim();
    });

Clean up the date using the 

      .split() and .trim() commands. 

Store the data into a json file in week02.
  
    fs.writeFileSync('/home/ec2-user/environment/week02/results.json', JSON.stringify(address));


Things to keep in mind: 

    1. Web developer tools are very useful in locating elements in an html file. 
    2. When working with real data, the html will not always look organized so you must invest in data clean up methods like ".split()". You can also use commands like ".find()" and ".remove()"
    3. Saving files that you might use later as json will make data analysis in the future easier. 
