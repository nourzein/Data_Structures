{"changed":true,"filter":false,"title":"week02.js","tooltip":"/week02/week02.js","value":"// npm install cheerio\nvar request = require('request');\nvar fs = require('fs');\nvar cheerio = require('cheerio');\n\n// load the thesis text file into a variable, `content`\n// this is the file that we created in the starter code from last week\nvar content = fs.readFileSync('../data/AA06.txt');\n\n// load `content` into a cheerio object\nvar $ = cheerio.load(content);\n\n\n// write the project titles to a text file\nvar address = []; // this variable will hold the lines of text\n\n$('tbody tbody tbody').children().each(function(i, elem) {\n   \n    \n  address [i] = $(elem).children().first().html().split(\"<br>\")[2].split(\",\")[0].split(\".\")[0].split(\"-\")[0].trim();\n}\n\n\n);\n\nfs.writeFileSync('/home/ec2-user/environment/week02/results.json', JSON.stringify(address));\n\n","undoManager":{"mark":-2,"position":0,"stack":[[{"start":{"row":21,"column":0},"end":{"row":22,"column":0},"action":"insert","lines":["",""],"id":2}]]},"ace":{"folds":[],"scrolltop":0,"scrollleft":0,"selection":{"start":{"row":27,"column":0},"end":{"row":27,"column":0},"isBackwards":false},"options":{"guessTabSize":true,"useWrapMode":false,"wrapToView":true},"firstLineState":0},"timestamp":1568328127919}