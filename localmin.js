var date=new Date(document.querySelector(".content h3").textContent.trim());var movies=[...document.querySelectorAll("#theaterShowtimeTable")].map(table=>{var duration=parseInt(table.querySelector("li:nth-child(2) > ul:nth-child(1) > li:nth-child(2)").textContent.split("%EF%BC%9A")[1])*60000;return{name:table.querySelector(".filmTitle a").textContent,duration:duration,info:[...table.querySelectorAll(".filmVersion")].map(ele=>ele.textContent).join(", "),times:[...table.querySelector(".filmVersion").parentElement.querySelectorAll("li:not([class])")].map(ele=>{var text=ele.textContent.split("%EF%BC%9A");var time=new Date(date);time.setHours(text[0]);time.setMinutes(text[1]);return{start:time.getTime(),end:time.getTime()+duration}})}});function pad(str,len){str=""+str;if(str.length>=len)return str;else return pad("0"+str,len)} var w=window.open();var times={};movies.map(movie=>{movie.times.map(time=>{times[time.start]=!0;times[time.end]=!0})});var timelist=[];for(var i in times)timelist.push(i);timelist.sort();timelist.map((time,index)=>times[time]=index+1);var table=[];table.push([{}].concat(movies.map(movie=>{return{textContent:movie.name}})));timelist.map(time=>{var date=new Date(parseInt(time));table.push([{textContent:pad(date.getHours(),2)+"%EF%BC%9A"+pad(date.getMinutes(),2)}].concat([...new Array(movies.length)].map(x=>new Object())))});movies.map((movie,i)=>{movie.times.map(time=>{var start=times[time.start];var end=times[time.end];var x=i+1;table[start][x].rowSpan=end-start;table[start][x].style={background:"green"};for(var y=start+1;y<end;y++)table[y][x].hidden=!0})});function attcopy(from,to){for(var i in from){if(from[i]instanceof Object)attcopy(from[i],to[i]||(to[i]={}));else to[i]=from[i]}} var wtable=w.document.createElement("table");table.map(row=>{var tr=w.document.createElement("tr");row.map(data=>{var td=w.document.createElement("td");td.style.border="solid black";td.style.padding="5px";attcopy(data,td);tr.appendChild(td)});wtable.appendChild(tr)});wtable.style.borderCollapse="collapse";w.document.body.appendChild(wtable)