//javascript:
var date = new Date(document.querySelector(".content h3").textContent.trim());
var movies = 
[...document.querySelectorAll("#theaterShowtimeTable")].map(table=>{
    var duration = parseInt(table.querySelector("li:nth-child(2) > ul:nth-child(1) > li:nth-child(2)").textContent.split("：")[1])*60000;
    return {
        name: table.querySelector(".filmTitle a").textContent,
        duration: duration,
        info: [...table.querySelectorAll(".filmVersion")].map(ele=>ele.textContent).join(", "),
        times: [...table.querySelector(".filmVersion").parentElement.querySelectorAll("li:not([class])")].map(ele=>{
            var text = ele.textContent.split("：");
            var time = new Date(date);
            time.setHours(text[0]);
            time.setMinutes(text[1]);
            return {
                start: time.getTime(),
                end: time.getTime() + duration
            };
        })
    };
});

var w = window.open();

var times = {};
movies.map(movie=>{
    movie.times.map(time=>{
        times[time.start] = true;
        times[time.end] = true;
    });
})
var timelist = [];
for(var i in times) timelist.push(i);
timelist.sort();
timelist.map((time, index)=>times[time]=index);

var table = [];
table.push([{textContent:"時間\\電影"}].concat(movies.map(movie=>{
    return {
        textContent: movie.name
    }
})));

function attcopy(from, to){
    for(var i in from){
        if(from[i] instanceof Object) attcopy(from[i], to[i] || (to[i]={}));
        else to[i] = from[i];
    }
}

var wtable = w.document.createElement("table");
table.map(row=>{
    var tr = w.document.createElement("tr");
    row.map(data=>{
        var td = w.document.createElement("td");
        td.style.border="solid black";
        td.style.padding = "5px";
        attcopy(data, td);
        tr.appendChild(td);
    })
    wtable.appendChild(tr);
})
wtable.style.border = "solid black";
wtable.style.borderCollapse = "collapse";
w.document.body.appendChild(wtable);

/*

─█████───█████──
───█████───█████

*/