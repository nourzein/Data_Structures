# Assignment 7
## Goal: To parse all ten zones, get geolocation for them, and put the information in tables.

## Process: 
Before taking on all ten zones, I only worked with zone06 (check folder zone06 for relevant files).
Note: I divided my sections into a parsing.js file, a geolocation.js file, a createTables.js file (for both tables), and an insertTables.js file (for both tables).

### To parse and clean the data: 
Cheerio dependency was used to access the html elements. 
After seeing how the data is naturally organized in the file, I thought it would make the most sense when parsing the data to have an array for each meeting address with the respective information for the meeting address (titles of the meeting are included here because that is how the data is organized, street address, meeting details, ect..) with a property called meeting instance for all the meetings in that address with the same details and name but differing days, times, types, and special interests. 
I used a cheerio .each to loop through the first [0] and second [1] td, to get the meeting and meeting instances respectively. 
A for loop was used to create locationIds that I put in each obeject (each meeting and meeting instance) to have all relevant objects connected to each other. 
I used async.eachSeries to look through all ten zones once I had perfected my zone06 parsing code. 

### To geolocate: 
To get the lat and long coordinates, I used the street address from the array I created in the parsing.js file and pushed the lat and long coordinates into each meeting. 
Async.each series was used to loop through all the zones. 

### To create and insert into tables: 
The code to create tables is the same as the one from week04, expect new columns were added. The big thing I learned here is how important the character count is= if your data does not fit it will NOT be pushed. 
Additionally, some syntax problems realted to apostrophes had me go back to the original parsing.js script and change the apostrophe to something that is not a special character. 
Before being able to push the meetingInstances from the object of meetings which is inside the entire array, I needed to remove those meeting instances into their own array of objects (they were arrays stored in objects stored in an array and it was a nightmare to try to pluck them out in the insert into part).

Async.each series was also used to loop through all the ten zones. 