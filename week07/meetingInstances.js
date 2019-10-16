// npm install cheerio
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');

// load the thesis text file into a variable, `content`
// this is the file that we created in the starter code from last week
//array function
var content = fs.readFileSync('./data/AA06.txt');

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
          let fullLocation= brArray[2].trim().replace("\n\t\t\t\t\t\t", "") + " " + brArray[3].trim();
          let scheduleDetails= $(td).find(".detailsBox").text().replace("\'s", "&apos;s").trim();   
          let meetingInstances=[];
        //   if ((scheduleDetails)==='') return;      //why zero doesn't work but empty string does?
        
      }

      if (i === 1) {
        let meetingInstances= $(td).html().split(/<br>\s+?<br>/).map(item=>item.trim()); //this is an array
        meetingInstances.forEach((meetingInstance)=> {
            let timeData= meetingInstance.split(/<b>.*?<\/b>/).filter(x=>x!== "")
              .map(x=>{
               return x.trim().replace(/ <br>$/, ""); 
                    }
                    );
            let dayN= meetingInstance.split('</b>')[0].replace(/.....$/, "").replace(/^.../, "");
             if (dayN.indexOf('day') === -1) return;
            if (timeData.length === 0) return;
            // if ((timeData[3])===0) return;
            let hhmm=timeData[0].split(/[: ]/);
            hhmm[0] = (hhmm[2] === 'PM' && hhmm[0] !== "12") ? +hhmm[0]+12 : +hhmm[0] ;
            timeData[0]= hhmm[0] + hhmm[1];
            hhmm=timeData[1].split(/[: ]/);
            hhmm[0] = (hhmm[2] === 'PM' && hhmm[0] !== "12") ? +hhmm[0]+12 : +hhmm[0] ;
            timeData[1]= hhmm[0] + hhmm[1];
            // console.log(+timeData[1])
           
            meetingInstances.push( {
                day: dayN,
                startTime: +timeData[0],
                endTime: +timeData[1],
                meetingType: (timeData[2]) ? timeData[2] : "",
                specialInterest: (timeData[3]) ? timeData[3] : "",
                    }
                    );
                     //create IDs 

        });
      meetings.push(meetingInstances);
     }
  
});

 console.log(meetings)


});


// const zone = 6;
// let id= (zone*1000)
// let r= (zone*1000)

// for (let i=0; i<meetings.length; i++) {
//     meetings[i]["locationId"]= id;
      
//  let meetingInstances = meetings[i].meetingInstances;
// //   console.log(id,meetingInstances);
//   for (let i=0;i<meetingInstances.length;i++) {
//       meetingInstances[i]["locationId"]=id;
//     //   console.log(id,meetingInstances[i])
    
//   }
//   id ++;
// }



// fs.writeFileSync('/home/ec2-user/environment/meetingResults06.json', JSON.stringify(meetings, null, 2));