var async = require('async');
var AWS = require('aws-sdk');
AWS.config = new AWS.Config();
AWS.config.region = "us-east-2";

var dynamodb = new AWS.DynamoDB();
var blogEntries = [];

class BlogEntry {
  constructor(partitionKey, dt, title, entry) {
    this.topic = {};
    this.topic.S = partitionKey;
    this.dt = {}; 
    this.dt.S = new Date(dt).toISOString(); 
    this.title = {};
    this.title.S = title;
    this.entry = {};
    this.entry.S = entry;
    
  }
}

// blogEntries.push(new BlogEntry("Data Structures Homework", '8/28/2019',"First Week", "Data structures seems super intense. I am kinda worried about failing this course lol. We have a homework due at the end of the week and I have no idea what any of the code means or does!"));
// blogEntries.push(new BlogEntry("Data Structures Homework", '8/30/2019', "End of First Week", "Update: I finished the homework and it is an amazinnggg feeling. I am concerend about how the rest of the semeter goes when all the other classes pick up pace."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '9/18/2019', "End of First Chapter", "This course is crazy. I legit have no idea how I am passing each assignment and it is so hard. Is this what a data visualization developer does? This sucks. I also do not see how any of this is useful? We are starting databases now, and I feel like that is the borning part of data viz."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '10/02/2019', " Queries", "We are doing queries this week. This assignmnet is pretty easy. I think Aaron made it so because the next one will be hard so we should plan ahead."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '10/05/2019', "Reflections", "I am starting to realize how useful data structures is. I literally use it in all my other classes thinking of how to structure my dat for any presention."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '10/16/2019', "Data Cleaning", "this is by far the hardest assignment yet. Aaron gave us extra time nd he knew we needed it and It was super useful. The process of doing this I am learing so much (differences between: asyc await, asyc series, for each series, for each)."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '10/23/2019', "Sensor Data", "Just when I was about to burst from the AA meeting data- Aaron switches up our work which is amazing. This week was a bit crazy because my sensor did not set up properly but I had to leave for a wedding in."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '10/30/2019', "Debate", "Today Christian made us debate in class. It was very cute ! I am beginng to enjoy the course more ad more as time progresses."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '11/06/2019', "Design", "November is heeeree. We are starting to move from back-end to front-end. We are working with design right now. It is great. We did some practice using express in class to create endpoints of where are courses will be linked to."));
// blogEntries.push(new BlogEntry("Data Structures Homework", '11/11/2019', "Query and Interface Design", "We are still doing the query work of how our finals will function and working on design stuff. I like that we will not be graded on design- I will put in effort of course but I do not need to cater to Aaron's style and could use any colors or style I want for this."));




// blogEntries.push(new BlogEntry("Data Viz Homework", '8/28/2019',"First Week", "Oh my god. This classes seems intense as well! We have this homework to do all this work using the retinal variables in illustrator and I have never used illustrator before. Between this and data structures, it wll be an intense week."));
// blogEntries.push(new BlogEntry("Data Viz Homework", '9/18/2019',"Clock:End of First Chapter", "Not going to lie, super confused about what Christian is looking for in his projects. The clocks were fun to work with but also extremely frustrating because when will I ever need this? I do feel annoyed that they took the most time to do and I am still a little unhappy with how basic mine came out. "));
// blogEntries.push(new BlogEntry("Data Viz Homework", '9/25/2019',"More Clocks", "I thought we were done but we are incorporating calender data into the clocks! P5 is a lot easier to use than d3, but I wish Christian as teaching us d3 instead (I am using it for major studio)."));
// blogEntries.push(new BlogEntry("Data Viz Homework", '10/02/2019',"Chapter Two: Thousand suns", "In this chapter we are working with nuclear bomb data that we have to add another dataset too and visualize. I think this exercise is excellent it help with how real world data viz jobs will be (getting a dataset to work with and findng and interesting story)"));
// blogEntries.push(new BlogEntry("Data Viz Homework", '10/04/2019',"Browsing Ideas", "Damn. This part is the hardest for me it seems. I cannot seem to get ideas easily at all. It is so stressful to come up with next concepts for classes almost every other week from scratch."));
// blogEntries.push(new BlogEntry("Data Viz Homework", '10/07/2019',"Browsing Ideas Pt.2", "I am thinking of ideas to do- I think looking at physics phds during the time or maybe treaties could be interesting."));
// blogEntries.push(new BlogEntry("Data Viz Homework", '10/15/2019',"Sketching Reflection", "I am a bit surprised by how much wok Christian expects each week. We have o explore a dataset, find a new dataset to add to it, create a visualizing, and do three sketches for it. I feel like each one of those is a week of hoemwork within itself. We ll end up coming with different portions of it done but never all of it. I had three sketches to show but my idea was not great. Amanda did no sketching but had a really good flushed out idea and extra variable. Yiran had no extra dataset but a good idea and sketches. I don't think the real world will be like this (along with three other classes of work)."));
// blogEntries.push(new BlogEntry("Data Viz Homework", '10/16/2019',"Circles and Treaties", "I will work with circles and treaties for this one. I want to have circle radius show number of tests and I still have to think of how to show treaties."));
// blogEntries.push(new BlogEntry("Data Viz Homework", '10/23/2019',"Ellispes and Treaties", "I by mistake found a great way to visualize this data! I will use the length and width of the cicrles to show different values-underground versus atmospheric tests!"));
// blogEntries.push(new BlogEntry("Data Viz Homework", '10/30/2019',"Presentations", "We presented our Thousand suns this week. It was a bit nerve wrecking because Christin gave us feedback (read: critisicm) infront of each other and it was a bit embaressing but we are all so close that it didn’t."));


blogEntries.push(new BlogEntry("Major Studio Homework", '09/28/2019', "First Week of School", "This classes seems like it will be chill. I don't really get how the structure will be but I am curious about what topics/lectures will be like. "));
blogEntries.push(new BlogEntry("Major Studio Homework", '09/18/2019', "Quantitative: End of First  Chapter ", "This weekend was a disaster. I thought that I was safe to leave the visual part of the project to the weekend before and it absolutely was not. I ended up creating a line graph in d3 and it worked and it showed interesting results- but the pressure I was in I hope to not repeat. Also, if I had more time I would have designed it better, and it would've looked nicer."));
blogEntries.push(new BlogEntry("Major Studio Homework", '9/25/2019', "Chapter Two: Qualitative", "Twe are working on our qualitative projects this week. Unsure what my subject will be, I am confused by what they mean when they are asking for a \"qualitative\" analysis… maybe analyze color and shape?"));
blogEntries.push(new BlogEntry("Major Studio Homework", '9/28/2019', "Browsing for Ideas", "Finding ideas for qualitative assignment is so hard. I feel like the idea brainstorming is so hard for me because I have never done anything creative in the ast- most of my work was statistics or research- things that are not based so much on creativity as much as on good logic and work flow. I am thinking of doing islamic rugs. They are so pretty and I love the pattern on them. I am really intrigued by the different dynasties and how they influenced the patterns of rugs. I think I will do that- an analysis of shapes and colors of te rus!"));
blogEntries.push(new BlogEntry("Major Studio Homework", '10/01/2019', "Browsing for Ideas Pt.2", "Ugh I am NOT going to do that. Shape is so hard to analyze and you need to explore machine learning stuff. I will work on my second idea- color analysis of european art."));
blogEntries.push(new BlogEntry("Major Studio Homework", '10/06/2019', "Color Analysis API", "I am beginning to do the color analysis- I have to fetch the objects using the MET api and download the images like that. I am using browser fetch to get the object ids- you can't really save the ids like this but I will console log them and just save it as a json. "));
blogEntries.push(new BlogEntry("Major Studio Homework", '10/08/2019', "Color Analysis Download", "For the images download portion-  will use request. We used it in data structures… it is funny I feel like data structures is the class that is most useful, so different than how I felt first month!"));
blogEntries.push(new BlogEntry("Major Studio Homework", '10/15/2019', "Color Analysis Color Analysis", "I thought of using vibrant for the color analysis but I think I will go with colortheif- server side. This is because colorthief gives you an average while vibrant give the \"flashiest\" color and I want to analyzed color evolution by the most used colors of the time. "));
blogEntries.push(new BlogEntry("Major Studio Homework", '10/18/2019', "Qualitative: End of Second Chapter", "The presention went well. I did a lot better this time I started right away with my topic and got into the design by the second week. D3 is becoming easir to use. I hope I get a good mark."));
blogEntries.push(new BlogEntry("Major Studio Homework", '11/05/2019', "Chapter 3: Interactive", "I am super excited for this chapter. I will beging to build upon my old ideas and just focus on coding and design for this one! No more agonizing over what topic to do! "));



var params = {};
params.TableName = "Dear_Diary2";


async.eachSeries(blogEntries, function(value, callback) {
params.Item = value;
// console.log(params);
dynamodb.putItem(params, function (err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
setTimeout(callback, 2000); //found out you do not need it, use for larger sets?

}) 
 