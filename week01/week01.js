var request = require('request');
var fs = require('fs');


var zone= ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'];

for  (let i = 0; i < zone.length; i++) 
{
  request('https://parsons.nyc/aa/m' + zone[i] + '.html', function(error, response, body){
    if (!error && response.statusCode == 200) {
        fs.writeFileSync('/home/ec2-user/environment/data/' + 'AA'+ zone[i] + '.txt', body);
    }
    else {console.log("Request failed!")}
  });
}


