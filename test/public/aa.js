window.onload= handleData;
let mymap;
let layerGroup;
let queryDay = "AND (1=1)";
let queryTime = "AND (1=1)";

function handleData () {
    $(".day").on("click", function (event) {
        let queryDayVal = $(this).val()
      queryDay= "AND day = '" + queryDayVal + "'";
      updateMap();
        //clear pervious points
    });
       
   $(".time").on("click", function (event) {
       let times = $(this).val().split(',');
       let time1 = +times[0];
       let time2 = +times[1];
       console.log(time1,time2);
       queryTime = "AND starttime BETWEEN " +time1+ " AND " + time2;
       console.log(queryTime);
       updateMap();
    //   queryTime= "AND starttime BETWEEN" + queryTimeOne + " AND " + queryTimeTwo;
        //console.log(day)
        //clear pervious points
    });
//submit button with fullQuery function    
//  $("#submit").on("click", fullQuery); 

 initMap()    
    //     );
    $.get({
        url:"/aaFullData", 
        success: drawMap
    })
    
    
    
    showMeetings()
}
 //submit function
//  function fullQuery () {
//   $.post({
//         url:"/aaData", 
//         data: {  
//             queryDay,
//             queryTime
//         },
//         success: drawMap
//   });      
// }

//function for map with full set (default view)
function initMap () {
    mymap=  L.map('mapid').setView([40.734636,-73.994997], 12.4);
    L.tileLayer('https://api.mapbox.com/styles/v1/nourzein/ck37isbvd0zd01cnkqcp4lcch/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoibm91cnplaW4iLCJhIjoiY2pkcGIzZmFpMGU2ODMzcGZrcjU0ZXAwbyJ9.XzdB3fcBU9caHJoJe3vSOg', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.light',
        accessToken: 'pk.eyJ1Ijoibm91cnplaW4iLCJhIjoiY2pkcGIzZmFpMGU2ODMzcGZrcjU0ZXAwbyJ9.XzdB3fcBU9caHJoJe3vSOg'
    }).addTo(mymap);
    layerGroup = L.layerGroup().addTo(mymap);
}

//map for drawing new filtered data
function drawMap(data) {
// 
var uniqueLatLong=[];
// // first remove all the markers in one go
   layerGroup.clearLayers();
//check for unique lat and long    
    
    console.log(data)
    for (var i=0; i<data.length; i++) {
        let item= data[i];
    //     let found= uniqueLatLong.find(
    //         (latlong)=> {
    //             return latlong.latitude===item.latitude && latlong.longitude===item.longitude
    //         }
    //         );
           
    //     if (found){
    //             found.count++;
    //           //  console.log(found.count)
    //         }
    //         else {
    //             uniqueLatLong.push({
    //                 latitude:item.latitude,
    //                 longitude:item.longitude, 
                    //   locationId=item.locationid
    //               
    // }
    
                       
    //                 count: 1
    //             }) 
    //         }
            
    //     //add makers for lat and long of filtered data 
    // }
    // uniqueLatLong.forEach(
    //     (item)=> {
    //         console.log(item.latitude)
            L.marker( [item.latitude, item.longitude] )
        //.bindPopup(data[i].meetingname)
        .addTo(layerGroup)
        .on("click", ()=> showMeetings(item)) 
        }
        //)
    
        //._icon.style.backgroundColor = 'green'
    console.log(uniqueLatLong)
    
}    
    

function showDropdown() {
    console.log('hello world');
 $("#myDropdown").show();
}

function showDropdownTwo() {
 $("#myDropdown2").show();
}
function Highlight(button) {
   $(".Highlight").removeClass("Highlight");
   $(button).addClass("Highlight");
}

function updateMap() {
    console.log(queryTime,queryDay);
    $.post({
        url:"/aaData", 
        data: {  
            queryDay,
            queryTime
        },
        success: drawMap
    });
    // console.log(data)
}


function showMeetings(data) {
    
//  document.getElementById(
//       "meetings").innerHTML =`${data.meetingInstances}`
     alert(JSON.stringify(data.meetings))
}
//     ).innerHTML = `Over the last month, there have been <span class="events">${
//       magnitudes.length
//     }</span> significant earthquakes with an average magnitude of <span class="mag">${avgMag.toFixed(
//       2
//     )}</span> and an average depth of <span class="depth">${avgDepth.toFixed(
//       2
//     )}</span>.`;

//     counter.innerHTML = `[ – / ${magnitudes.length}]`;
//   }




// Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content1");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// }    
