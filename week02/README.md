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
