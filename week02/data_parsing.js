// npm install cheerio
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
//array function
var content = fs.readFileSync('../data/AA06.txt');

// load `content` into a cheerio object
var $ = cheerio.load(content);


// write the project titles to a text file
var meetings = []; // this variable will hold the lines of text
let aMeeting;

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
  let meetingInstances=[];
    aMeeting= { 
        address, meetingName, meetingTitle, fullLocation, greyBox, meetingInstances
    
         }

}

if (i === 1) {
    let meetingInstances= $(td).html().split(/<br>\s+?<br>/).map(s=>s.trim());
    meetingInstances.forEach(
        (meetingInstance)=> {
            console.log(meetingInstance.split(/<b>.*?<\/b>/));
            let timeData= meetingInstance.split(/<b>.*?<\/b>/).filter(x=>x!== "")
                .map(x=>{
                    return x.trim().replace(/ <br>$/, "");
                    
                }
                );
            
            if (timeData.length === 0) return;
            
            aMeeting.meetingInstances.push( {
                day: $(td).html().split('</b>')[0].replace(/.....$/, "").replace("<b>", "").trim(),
                startTime: timeData[0],
                endTime: timeData[1],
                meetingType: (timeData[2]) ? timeData[2] : "",
                specialInterest: (timeData[3]) ? timeData[3] : "",
            }
                );
           
        }
        
        );
          meetings.push(aMeeting);
    // let day= string.split('</b>')[0].replace(/.....$/, "").replace("<b>", "").trim(); //why cant I use .replace(/...^?, "") to do it?
    // let startTime= string.split('<b>')[1].replace("Mondays From</b>", "").trim();
    // let endTime= string.split('<br>')[0].replace("<b>Mondays From</b>  3:00 PM <b>to</b>", "").trim();
    // let meetingType= string.split('<br>')[1].replace("<b>Meeting Type</b>", "").trim();
    // let specialInterest= string.split('<br>')[2].replace("<b>Special Interest</b>", "").trim();
  
//   console.log(aMeeting);  
    // meetings.push({ 
    // day, startTime, endTime, meetingType, specialInterest})
    
}
  
});
    console.log(meetings[i]);
}
);

// console.log(meetings);

// fs.writeFileSync('/home/ec2-user/environment/week02/results06.json', JSON.stringify(meetings));