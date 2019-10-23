{"filter":false,"title":"tableInsertAll2.js","tooltip":"/tableInsertAll2.js","undoManager":{"mark":50,"position":50,"stack":[[{"start":{"row":0,"column":0},"end":{"row":51,"column":4},"action":"insert","lines":["const { Client } = require('pg');","var async = require('async');","const fs= require('fs')","","//load in enviromental variable module","const dotenv = require('dotenv');","dotenv.config();","","// create instance aalocations","var db_credentials = new Object();","db_credentials.user = 'nour'; //your username","db_credentials.host = process.env.WEB_HOST; //your endpoint","db_credentials.database = 'aa';","db_credentials.password = process.env.POSTGPW; //password. use an environment variable ","db_credentials.port = 5432; ","","//load in JSON file. Parse it to be able to use it.","var address_AA06= fs.readFileSync('./geolocationResults06.json')","var addressesForDb = JSON.parse(address_AA06);","var myArray= []","","","for ( var i=0; i< addressesForDb.length; i++) {","    ","    addressesForDb[i].meetingInstances.forEach(","        meeting=> ","        myArray.push(meeting)","        )","}","console.log(myArray);","","        ","","//var meetingObjects= addressesForDb.map(elem => {"," //             return elem.meetingInstances });","","","async.eachSeries(myArray, function(value, callback) {","    // if (value.locationId !== 6001) return;","    // value.scheduleDetails.replace(\"'\", \"&apos;\");","    const client = new Client(db_credentials);","    client.connect();","   ","    var thisQuery = \"INSERT INTO AAMeetingInstances VALUES (E'\" + value.day + \"', \" + value.startTime + \", \" + value.endTime + \" , '\" + value.meetingType + \"',  '\" + value.specialInterest + \"', \" + value.locationId + \");\"; ","    client.query(thisQuery, (err, res) => {","         console.log(err, res);","        client.end();","     });","       ","     setTimeout(callback, 1000); ","    console.log(thisQuery)"," });"],"id":1}],[{"start":{"row":16,"column":51},"end":{"row":17,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":17,"column":0},"end":{"row":18,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":21,"column":2},"end":{"row":21,"column":3},"action":"remove","lines":["r"],"id":3},{"start":{"row":21,"column":1},"end":{"row":21,"column":2},"action":"remove","lines":["a"]},{"start":{"row":21,"column":0},"end":{"row":21,"column":1},"action":"remove","lines":["v"]}],[{"start":{"row":21,"column":0},"end":{"row":21,"column":1},"action":"insert","lines":["l"],"id":4},{"start":{"row":21,"column":1},"end":{"row":21,"column":2},"action":"insert","lines":["e"]},{"start":{"row":21,"column":2},"end":{"row":21,"column":3},"action":"insert","lines":["t"]}],[{"start":{"row":20,"column":2},"end":{"row":20,"column":3},"action":"remove","lines":["r"],"id":5},{"start":{"row":20,"column":1},"end":{"row":20,"column":2},"action":"remove","lines":["a"]},{"start":{"row":20,"column":0},"end":{"row":20,"column":1},"action":"remove","lines":["v"]}],[{"start":{"row":20,"column":0},"end":{"row":20,"column":1},"action":"insert","lines":["l"],"id":6},{"start":{"row":20,"column":1},"end":{"row":20,"column":2},"action":"insert","lines":["e"]},{"start":{"row":20,"column":2},"end":{"row":20,"column":3},"action":"insert","lines":["t"]}],[{"start":{"row":19,"column":2},"end":{"row":19,"column":3},"action":"remove","lines":["r"],"id":7},{"start":{"row":19,"column":1},"end":{"row":19,"column":2},"action":"remove","lines":["a"]},{"start":{"row":19,"column":0},"end":{"row":19,"column":1},"action":"remove","lines":["v"]}],[{"start":{"row":19,"column":0},"end":{"row":19,"column":1},"action":"insert","lines":["l"],"id":8},{"start":{"row":19,"column":1},"end":{"row":19,"column":2},"action":"insert","lines":["e"]},{"start":{"row":19,"column":2},"end":{"row":19,"column":3},"action":"insert","lines":["t"]}],[{"start":{"row":19,"column":0},"end":{"row":20,"column":0},"action":"insert","lines":["",""],"id":9}],[{"start":{"row":19,"column":0},"end":{"row":25,"column":0},"action":"insert","lines":["let zones = ['01','02','03','04','05','06','07','08','09','10']","","async.eachSeries(zones, ","function(value, callback) {  ","  var addressesForDb = JSON.parse(fs.readFileSync('./geofile/AA' + value + '.json'));","  console.log(addressesForDb);",""],"id":10}],[{"start":{"row":26,"column":1},"end":{"row":29,"column":0},"action":"remove","lines":["et address_AA06= fs.readFileSync('./geolocationResults06.json')","let addressesForDb = JSON.parse(address_AA06);","let myArray= []",""],"id":11},{"start":{"row":26,"column":0},"end":{"row":26,"column":1},"action":"remove","lines":["l"]},{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":24,"column":1},"end":{"row":24,"column":30},"action":"remove","lines":[" console.log(addressesForDb);"],"id":12},{"start":{"row":24,"column":1},"end":{"row":24,"column":2},"action":"insert","lines":["l"]},{"start":{"row":24,"column":2},"end":{"row":24,"column":3},"action":"insert","lines":["e"]},{"start":{"row":24,"column":3},"end":{"row":24,"column":4},"action":"insert","lines":["t"]}],[{"start":{"row":24,"column":4},"end":{"row":24,"column":5},"action":"insert","lines":[" "],"id":13}],[{"start":{"row":23,"column":4},"end":{"row":23,"column":5},"action":"remove","lines":["r"],"id":14},{"start":{"row":23,"column":3},"end":{"row":23,"column":4},"action":"remove","lines":["a"]},{"start":{"row":23,"column":2},"end":{"row":23,"column":3},"action":"remove","lines":["v"]}],[{"start":{"row":23,"column":2},"end":{"row":23,"column":3},"action":"insert","lines":["l"],"id":15},{"start":{"row":23,"column":3},"end":{"row":23,"column":4},"action":"insert","lines":["e"]},{"start":{"row":23,"column":4},"end":{"row":23,"column":5},"action":"insert","lines":["t"]}],[{"start":{"row":24,"column":5},"end":{"row":24,"column":6},"action":"insert","lines":["m"],"id":16},{"start":{"row":24,"column":6},"end":{"row":24,"column":7},"action":"insert","lines":["y"]},{"start":{"row":24,"column":7},"end":{"row":24,"column":8},"action":"insert","lines":["A"]},{"start":{"row":24,"column":8},"end":{"row":24,"column":9},"action":"insert","lines":["r"]},{"start":{"row":24,"column":9},"end":{"row":24,"column":10},"action":"insert","lines":["r"]},{"start":{"row":24,"column":10},"end":{"row":24,"column":11},"action":"insert","lines":["a"]},{"start":{"row":24,"column":11},"end":{"row":24,"column":12},"action":"insert","lines":["y"]}],[{"start":{"row":24,"column":12},"end":{"row":24,"column":14},"action":"insert","lines":["()"],"id":17}],[{"start":{"row":24,"column":12},"end":{"row":24,"column":13},"action":"insert","lines":["="],"id":18}],[{"start":{"row":24,"column":14},"end":{"row":24,"column":15},"action":"remove","lines":[")"],"id":19},{"start":{"row":24,"column":13},"end":{"row":24,"column":14},"action":"remove","lines":["("]}],[{"start":{"row":24,"column":13},"end":{"row":24,"column":15},"action":"insert","lines":["[]"],"id":20}],[{"start":{"row":23,"column":1},"end":{"row":23,"column":2},"action":"remove","lines":[" "],"id":21},{"start":{"row":23,"column":0},"end":{"row":23,"column":1},"action":"remove","lines":[" "]}],[{"start":{"row":24,"column":0},"end":{"row":24,"column":1},"action":"remove","lines":[" "],"id":22}],[{"start":{"row":25,"column":0},"end":{"row":26,"column":0},"action":"remove","lines":["",""],"id":23},{"start":{"row":24,"column":14},"end":{"row":25,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":24,"column":14},"end":{"row":25,"column":0},"action":"insert","lines":["",""],"id":24}],[{"start":{"row":33,"column":0},"end":{"row":33,"column":1},"action":"insert","lines":["/"],"id":25},{"start":{"row":33,"column":1},"end":{"row":33,"column":2},"action":"insert","lines":["/"]}],[{"start":{"row":34,"column":0},"end":{"row":48,"column":4},"action":"insert","lines":["async.eachSeries(myArray, function(value, callback) {","    // if (value.locationId !== 6001) return;","    // value.scheduleDetails.replace(\"'\", \"&apos;\");","    const client = new Client(db_credentials);","    client.connect();","   ","    var thisQuery = \"INSERT INTO AAMeetingInstances VALUES (E'\" + value.day + \"', \" + value.startTime + \", \" + value.endTime + \" , '\" + value.meetingType + \"',  '\" + value.specialInterest + \"', \" + value.locationId + \");\"; ","    client.query(thisQuery, (err, res) => {","         console.log(err, res);","        client.end();","     });","       ","     setTimeout(callback, 1000); ","    console.log(thisQuery)"," });"],"id":26}],[{"start":{"row":50,"column":0},"end":{"row":65,"column":8},"action":"remove","lines":["","//var meetingObjects= addressesForDb.map(elem => {"," //             return elem.meetingInstances });","","","async.eachSeries(myArray, function(value, callback) {","    // if (value.locationId !== 6001) return;","    // value.scheduleDetails.replace(\"'\", \"&apos;\");","    const client = new Client(db_credentials);","    client.connect();","   ","    var thisQuery = \"INSERT INTO AAMeetingInstances VALUES (E'\" + value.day + \"', \" + value.startTime + \", \" + value.endTime + \" , '\" + value.meetingType + \"',  '\" + value.specialInterest + \"', \" + value.locationId + \");\"; ","    client.query(thisQuery, (err, res) => {","         console.log(err, res);","        client.end();","     });"],"id":27}],[{"start":{"row":51,"column":0},"end":{"row":54,"column":4},"action":"remove","lines":["       ","     setTimeout(callback, 1000); ","    console.log(thisQuery)"," });"],"id":28},{"start":{"row":50,"column":0},"end":{"row":51,"column":0},"action":"remove","lines":["",""]},{"start":{"row":49,"column":8},"end":{"row":50,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":40,"column":35},"end":{"row":40,"column":36},"action":"insert","lines":["a"],"id":29},{"start":{"row":40,"column":36},"end":{"row":40,"column":37},"action":"insert","lines":["l"]},{"start":{"row":40,"column":37},"end":{"row":40,"column":38},"action":"insert","lines":["l"]}],[{"start":{"row":49,"column":8},"end":{"row":50,"column":0},"action":"insert","lines":["",""],"id":30},{"start":{"row":50,"column":0},"end":{"row":50,"column":8},"action":"insert","lines":["        "]}],[{"start":{"row":50,"column":8},"end":{"row":51,"column":3},"action":"insert","lines":["setTimeout(callback, 3000); ","});"],"id":31}],[{"start":{"row":50,"column":4},"end":{"row":50,"column":8},"action":"remove","lines":["    "],"id":32},{"start":{"row":50,"column":0},"end":{"row":50,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":24,"column":14},"end":{"row":25,"column":0},"action":"remove","lines":["",""],"id":33}],[{"start":{"row":32,"column":0},"end":{"row":32,"column":23},"action":"remove","lines":["//console.log(myArray);"],"id":34},{"start":{"row":31,"column":1},"end":{"row":32,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":33,"column":2},"end":{"row":34,"column":52},"action":"remove","lines":["  // if (value.locationId !== 6001) return;","    // value.scheduleDetails.replace(\"'\", \"&apos;\");"],"id":35},{"start":{"row":33,"column":1},"end":{"row":33,"column":2},"action":"remove","lines":[" "]},{"start":{"row":33,"column":0},"end":{"row":33,"column":1},"action":"remove","lines":[" "]},{"start":{"row":32,"column":53},"end":{"row":33,"column":0},"action":"remove","lines":["",""]}],[{"start":{"row":24,"column":0},"end":{"row":24,"column":4},"action":"insert","lines":["    "],"id":36},{"start":{"row":25,"column":0},"end":{"row":25,"column":4},"action":"insert","lines":["    "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":4},"action":"insert","lines":["    "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":4},"action":"insert","lines":["    "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":4},"action":"insert","lines":["    "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":4},"action":"insert","lines":["    "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":4},"action":"insert","lines":["    "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":24,"column":0},"end":{"row":24,"column":4},"action":"insert","lines":["    "],"id":37},{"start":{"row":25,"column":0},"end":{"row":25,"column":4},"action":"insert","lines":["    "]},{"start":{"row":26,"column":0},"end":{"row":26,"column":4},"action":"insert","lines":["    "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":4},"action":"insert","lines":["    "]},{"start":{"row":28,"column":0},"end":{"row":28,"column":4},"action":"insert","lines":["    "]},{"start":{"row":29,"column":0},"end":{"row":29,"column":4},"action":"insert","lines":["    "]},{"start":{"row":30,"column":0},"end":{"row":30,"column":4},"action":"insert","lines":["    "]},{"start":{"row":31,"column":0},"end":{"row":31,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":32,"column":0},"end":{"row":32,"column":4},"action":"insert","lines":["    "],"id":38},{"start":{"row":33,"column":0},"end":{"row":33,"column":4},"action":"insert","lines":["    "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"insert","lines":["    "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"insert","lines":["    "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":4},"action":"insert","lines":["    "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":4},"action":"insert","lines":["    "]},{"start":{"row":38,"column":0},"end":{"row":38,"column":4},"action":"insert","lines":["    "]},{"start":{"row":39,"column":0},"end":{"row":39,"column":4},"action":"insert","lines":["    "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":4},"action":"insert","lines":["    "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":4},"action":"insert","lines":["    "]},{"start":{"row":42,"column":0},"end":{"row":42,"column":4},"action":"insert","lines":["    "]},{"start":{"row":43,"column":0},"end":{"row":43,"column":4},"action":"insert","lines":["    "]},{"start":{"row":44,"column":0},"end":{"row":44,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":32,"column":0},"end":{"row":32,"column":4},"action":"insert","lines":["    "],"id":39},{"start":{"row":33,"column":0},"end":{"row":33,"column":4},"action":"insert","lines":["    "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"insert","lines":["    "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"insert","lines":["    "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":4},"action":"insert","lines":["    "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":4},"action":"insert","lines":["    "]},{"start":{"row":38,"column":0},"end":{"row":38,"column":4},"action":"insert","lines":["    "]},{"start":{"row":39,"column":0},"end":{"row":39,"column":4},"action":"insert","lines":["    "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":4},"action":"insert","lines":["    "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":4},"action":"insert","lines":["    "]},{"start":{"row":42,"column":0},"end":{"row":42,"column":4},"action":"insert","lines":["    "]},{"start":{"row":43,"column":0},"end":{"row":43,"column":4},"action":"insert","lines":["    "]},{"start":{"row":44,"column":0},"end":{"row":44,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":32,"column":0},"end":{"row":32,"column":4},"action":"insert","lines":["    "],"id":40},{"start":{"row":33,"column":0},"end":{"row":33,"column":4},"action":"insert","lines":["    "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"insert","lines":["    "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"insert","lines":["    "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":4},"action":"insert","lines":["    "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":4},"action":"insert","lines":["    "]},{"start":{"row":38,"column":0},"end":{"row":38,"column":4},"action":"insert","lines":["    "]},{"start":{"row":39,"column":0},"end":{"row":39,"column":4},"action":"insert","lines":["    "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":4},"action":"insert","lines":["    "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":4},"action":"insert","lines":["    "]},{"start":{"row":42,"column":0},"end":{"row":42,"column":4},"action":"insert","lines":["    "]},{"start":{"row":43,"column":0},"end":{"row":43,"column":4},"action":"insert","lines":["    "]},{"start":{"row":44,"column":0},"end":{"row":44,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":32,"column":0},"end":{"row":32,"column":4},"action":"insert","lines":["    "],"id":41},{"start":{"row":33,"column":0},"end":{"row":33,"column":4},"action":"insert","lines":["    "]},{"start":{"row":34,"column":0},"end":{"row":34,"column":4},"action":"insert","lines":["    "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"insert","lines":["    "]},{"start":{"row":36,"column":0},"end":{"row":36,"column":4},"action":"insert","lines":["    "]},{"start":{"row":37,"column":0},"end":{"row":37,"column":4},"action":"insert","lines":["    "]},{"start":{"row":38,"column":0},"end":{"row":38,"column":4},"action":"insert","lines":["    "]},{"start":{"row":39,"column":0},"end":{"row":39,"column":4},"action":"insert","lines":["    "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":4},"action":"insert","lines":["    "]},{"start":{"row":41,"column":0},"end":{"row":41,"column":4},"action":"insert","lines":["    "]},{"start":{"row":42,"column":0},"end":{"row":42,"column":4},"action":"insert","lines":["    "]},{"start":{"row":43,"column":0},"end":{"row":43,"column":4},"action":"insert","lines":["    "]},{"start":{"row":44,"column":0},"end":{"row":44,"column":4},"action":"insert","lines":["    "]}],[{"start":{"row":24,"column":4},"end":{"row":24,"column":8},"action":"remove","lines":["    "],"id":42},{"start":{"row":24,"column":0},"end":{"row":24,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":24,"column":0},"end":{"row":24,"column":14},"action":"remove","lines":["let myArray=[]"],"id":43}],[{"start":{"row":20,"column":0},"end":{"row":20,"column":14},"action":"insert","lines":["let myArray=[]"],"id":44}],[{"start":{"row":20,"column":14},"end":{"row":21,"column":0},"action":"insert","lines":["",""],"id":45}],[{"start":{"row":27,"column":10},"end":{"row":27,"column":11},"action":"remove","lines":[" "],"id":46},{"start":{"row":27,"column":9},"end":{"row":27,"column":10},"action":"remove","lines":[" "]},{"start":{"row":27,"column":8},"end":{"row":27,"column":9},"action":"remove","lines":[" "]},{"start":{"row":27,"column":4},"end":{"row":27,"column":8},"action":"remove","lines":["    "]},{"start":{"row":27,"column":0},"end":{"row":27,"column":4},"action":"remove","lines":["    "]},{"start":{"row":26,"column":55},"end":{"row":27,"column":1},"action":"remove","lines":[""," "]}],[{"start":{"row":35,"column":18},"end":{"row":35,"column":19},"action":"remove","lines":[" "],"id":47},{"start":{"row":35,"column":17},"end":{"row":35,"column":18},"action":"remove","lines":[" "]},{"start":{"row":35,"column":16},"end":{"row":35,"column":17},"action":"remove","lines":[" "]},{"start":{"row":35,"column":12},"end":{"row":35,"column":16},"action":"remove","lines":["    "]},{"start":{"row":35,"column":8},"end":{"row":35,"column":12},"action":"remove","lines":["    "]},{"start":{"row":35,"column":4},"end":{"row":35,"column":8},"action":"remove","lines":["    "]},{"start":{"row":35,"column":0},"end":{"row":35,"column":4},"action":"remove","lines":["    "]}],[{"start":{"row":34,"column":37},"end":{"row":35,"column":0},"action":"remove","lines":["",""],"id":48}],[{"start":{"row":40,"column":21},"end":{"row":40,"column":22},"action":"remove","lines":[" "],"id":49},{"start":{"row":40,"column":20},"end":{"row":40,"column":21},"action":"remove","lines":[" "]},{"start":{"row":40,"column":16},"end":{"row":40,"column":20},"action":"remove","lines":["    "]},{"start":{"row":40,"column":12},"end":{"row":40,"column":16},"action":"remove","lines":["    "]},{"start":{"row":40,"column":8},"end":{"row":40,"column":12},"action":"remove","lines":["    "]},{"start":{"row":40,"column":4},"end":{"row":40,"column":8},"action":"remove","lines":["    "]},{"start":{"row":40,"column":0},"end":{"row":40,"column":4},"action":"remove","lines":["    "]},{"start":{"row":39,"column":24},"end":{"row":40,"column":1},"action":"remove","lines":[""," "]}],[{"start":{"row":20,"column":0},"end":{"row":20,"column":14},"action":"remove","lines":["let myArray=[]"],"id":50}],[{"start":{"row":25,"column":0},"end":{"row":25,"column":14},"action":"insert","lines":["let myArray=[]"],"id":51}]]},"ace":{"folds":[],"scrolltop":222.5,"scrollleft":0,"selection":{"start":{"row":25,"column":14},"end":{"row":25,"column":14},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":12,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1571356769503,"hash":"435caeadde2bb7586759ddb3f572d40646742552"}