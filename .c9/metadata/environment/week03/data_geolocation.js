{"changed":true,"filter":false,"title":"data_geolocation.js","tooltip":"/week03/data_geolocation.js","value":"var request = require('request'); // npm install request\nvar async = require('async'); // npm install async\nvar fs = require('fs');\nconst dotenv = require('dotenv'); // npm install dotenv\n\n// TAMU api key\ndotenv.config();\nconst apiKey = process.env.API_KEY;","undoManager":{"mark":-2,"position":4,"stack":[[{"start":{"row":0,"column":0},"end":{"row":3,"column":55},"action":"insert","lines":["var request = require('request'); // npm install request","var async = require('async'); // npm install async","var fs = require('fs');","const dotenv = require('dotenv'); // npm install dotenv"],"id":1}],[{"start":{"row":3,"column":55},"end":{"row":4,"column":0},"action":"insert","lines":["",""],"id":2},{"start":{"row":4,"column":0},"end":{"row":5,"column":0},"action":"insert","lines":["",""]}],[{"start":{"row":5,"column":0},"end":{"row":6,"column":35},"action":"insert","lines":["dotenv.config();","const apiKey = process.env.API_KEY;"],"id":3}],[{"start":{"row":4,"column":0},"end":{"row":5,"column":0},"action":"insert","lines":["",""],"id":4}],[{"start":{"row":5,"column":0},"end":{"row":5,"column":15},"action":"insert","lines":["// TAMU api key"],"id":5}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":5,"column":15},"end":{"row":5,"column":15},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":{"row":0,"state":"start","mode":"ace/mode/javascript"}},"timestamp":1570666867598}