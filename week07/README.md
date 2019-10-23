# Assignment 7
## Goal: To parse all ten zones, get geolocation for them, and put the information in tables.

## Process: 
Before taking on all ten zones, I only worked with zone06 (check folder zone06 for relevant files).

To parse and clean the data: 
Cheerio dependency was used to access the html elements. 
After seeing how the data is naturally organized in the file, I thought it would make the most sense when parsing the data to have an array for each meeting address with the respective information for the meeting address (titles of the meeting are included here because that is how the data is organized, street address, meeting details, ect..) with a property called meeting instance for all the meetings in that address with the same details and name but differing days, times, types, and special intresests