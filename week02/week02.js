// npm install cheerio
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
var content = fs.readFileSync('../data/AA06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);


// write the project titles to a text file
var address = []; // this variable will hold the lines of text

$('tbody tbody tbody').children().each(function(i, elem) {
   
    
  address [i] = $(elem).children().first().html().split("<br>")[2].split(",")[0].split(".")[0].split("-")[0].trim();
}

);

fs.writeFileSync('/home/ec2-user/environment/week02/results.json', JSON.stringify(address));

