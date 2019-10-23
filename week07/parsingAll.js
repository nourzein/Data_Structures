const fs = require('fs');
const cheerio = require('cheerio');
var async = require('async');

let zones = ['01','02','03','04','05','06','07','08','09','10']
//let content = fs.readFileSync('./data/AA0'+value + '.txt');
//if (i=== zones.length) {
//     fs.writeFileSync('./files/' + value + '.json',JSON.stringify(meetings));
//}


async.eachSeries(zones, 

function(value, callback) {   
  
  let content = fs.readFileSync('./data/AA'+value + '.txt');
  let $ = cheerio.load(content);
  
let meetings = []; 
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
            aMeeting= { 
                address, meetingName, meetingTitle, fullLocation, scheduleDetails, meetingInstances
                }
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
           
            aMeeting.meetingInstances.push( {
                day: dayN,
                startTime: +timeData[0],
                endTime: +timeData[1],
                meetingType: (timeData[2]) ? timeData[2] : "",
                specialInterest: (timeData[3]) ? timeData[3] : "",
                    }
                    );

        });
      meetings.push(aMeeting);
     }
  
});

});

let id= (value*1000)
for (let i=0; i<meetings.length; i++) {
    meetings[i]["locationId"]= id;
      
 let meetingInstances = meetings[i].meetingInstances;
//   console.log(id,meetingInstances);
  for (let i=0;i<meetingInstances.length;i++) {
      meetingInstances[i]["locationId"]=id;
    //   console.log(id,meetingInstances[i])
    
  }
  id ++;
}

    fs.writeFileSync('./file/AA' + value + '.json', JSON.stringify(meetings, null, 2));
    console.log('*** *** *** *** ***'); // simply to see theoutput well
    console.log('Number of meetings in this zone: ');
    console.log(meetings.length); // see how many meetings were done

setTimeout(callback, 2000);
}); 










