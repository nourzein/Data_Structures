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
var meetings = []; // this variable will hold the lines of text

$('tbody tbody tbody').children().each(function(i, elem) {
   
  

$(elem).find("td").each(function(i, td) {
    
    if (i===0) { 
  let html= $(td).html();
  let brArray= html.split("<br>");
  let address= brArray[2].split(",")[0].split(".")[0].split("-")[0].trim();
  let meetingName= brArray[1].replace(/<.?b>/g,"").trim(); 
  let meetingTitle= brArray[0].replace(/.....$/, "").split(">")[1].trim();
  let fullLocation= brArray[2].trim() + "\\n" + brArray[3].trim();
  let greyBox= $(td).find(".detailsBox").text().trim();   
 
    meetings.push({ 
    address, meetingName, meetingTitle, fullLocation, greyBox
    
})
}

if (i === 1) {
    let string= $(td).html()
    let day= string.split('</b>')[0].replace(/.....$/, "").replace("<b>", "").trim(); //why cant I use .replace(/...^?, "") to do it?
    let startTime= string.split('<b>')[1].replace("Mondays From</b>", "").trim();
    let endTime= string.split('<br>')[0].replace("<b>Mondays From</b>  3:00 PM <b>to</b>", "").trim();
    let meetingType= 
    // let specialInterest=
    
    
    
   console.log(day);  
    
    
    
}

        
        
        
        
        
        
        
        
        
        
        
        
    
    
});

 
 





    // console.log(meetings[i]);
    
}

);

// console.log(meetings);

// fs.writeFileSync('/home/ec2-user/environment/week02/results.json', JSON.stringify(address));