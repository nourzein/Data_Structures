Link: http://3.19.185.130:8080/ 

# AA Meetings Map
For this project, we had to scrape 10 AA zones for their meetings and meeting information. 
These are the links for the 10 zones: 

    https://parsons.nyc/aa/m01.html  
    https://parsons.nyc/aa/m02.html  
    https://parsons.nyc/aa/m03.html  
    https://parsons.nyc/aa/m04.html  
    https://parsons.nyc/aa/m05.html  
    https://parsons.nyc/aa/m06.html  
    https://parsons.nyc/aa/m07.html  
    https://parsons.nyc/aa/m08.html  
    https://parsons.nyc/aa/m09.html  
    https://parsons.nyc/aa/m10.html   
    
In order to build a functioning AA map from this information, I needed to extract all the relevant information, and build a user-friendly map application.
My tools were first and formost: AWS and Node.js, and then: 

* request- to request data
* tamu- to get geolocation
* fs- to read and write files
* cheerio- to scrape and clean a webpage 
* async- to run functions in order
* pg- for my database building and query (SQL)
* express- to make dynamic requests between the application and databse
* jQuery- to help front-end and back-end javascript communicate
* handlebars- as a template for repetative data (also used as jQuery to send back-end data to the front-end)

### What information does the user need and why?
The user needs the location of the meeting, with the information regarding that meeting (day and time firstly, then type and special interests). 
![deafult_view](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/aa_1.png)

This is why I chose to do a day and time filter, but kept the other information as a sidebar pop up. It makes the interfarce more focused and does not overwhelm the user with choices.
[![filter_view_video](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/aa_video_screenshot.png)](https://vimeo.com/user106195632/review/379468386/8519f545bc)

### What do the map markers represent and how is the data being queried?
The map markers represent one distict location that contains multiple meetings. The way the site is set up is redundant with multiple meetings in one location with one meeting name, but then the same location with another set of meetings and a different meeting name. 
In order to reduce redundancy in the visualization, but also in the database (I used SQL Postgres for this project-relational databases), I created two tables one for the locations and one for the meeting details. 
In the default view, the inital query will show you all the locations with meetings but no meeting detail- this is so that the application does not run slow. Once you are interested in a specific time, you will have access to the meetings then. 

# Dear Diary
For this project, we had to document some over a period of time like a diary/journal. I documented the journey of my first semester in data viz grad school. 
I personalized the website design the way I like: I used pink and a more retro aesthetic with my font choice. 
The site does not show any data in its default view and therefore runs very fast. The data is only queried in the drop down menu, again making the application fast since there is no data load.
I can add as many drop down options as I want, it will not affect the visualization or functionality. 
I used NoSQL for this project because the data to be queried and demontrated is in "blocks" so to speak. You would never want to just query titles, or dates, or words. The functionality is about reading a block of blog post in an orderly fashion.
![dd](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/dd_1.png)
![dd_2](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/dd_2.png)
[![dd_video](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/dd_video_screenshot.png)](https://vimeo.com/user106195632/review/379468825/8072046f84)

# Temperature Sensor
For this project, we had to use a photon to measure the temperature over a period of time and then visualize the data. 
I measured the temperature in my bedroom right next to my window. I stored the data in an SQL database because unlike the journal project, here I would want to query for specific values only. 
I used a bar graph to show the data. It seemed effecient and easy to read. For the future, I think I would use a line graph however- line graphs would more easily demonstrate trends. 
My color choice was a mixture of taste (I like pink) and context (I used vibrant colors, pink and red to show temperature). 
There is a tooltip to give additional information about the average temperature in that hour (I collected data per minute, but minute data was not necessary).
![temp_1](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/temp_1.png)
![temp_2](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/temp_2.png)
[![temp_video](https://github.com/nourzein/Data_Structures/blob/master/final_assignments/temp_video_screenshot.png)](https://vimeo.com/user106195632/review/379469232/cd39fc9643)


