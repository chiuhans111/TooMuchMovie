//javascript:
var date = new Date(document.querySelector(".content h3").textContent.trim());
var movies =
    [...document.querySelectorAll("#theaterShowtimeTable")].map(table => {
        var duration = parseInt(table.querySelector("li:nth-child(2) > ul:nth-child(1) > li:nth-child(2)").textContent.split("：")[1]) * 60000;
        return {
            name: table.querySelector(".filmTitle a").textContent,
            duration: duration,
            info: [...table.querySelectorAll(".filmVersion")].map(ele => ele.textContent).join(", "),
            times: [...table.querySelector(".filmVersion").parentElement.querySelectorAll("li:not([class])")].map(ele => {
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

function pad(str, len) {
    str = "" + str;
    if (str.length >= len) return str;
    else return pad("0" + str, len);
}

var w = window.open();

var times = {};
movies.map(movie => {
    movie.times.map(time => {
        times[time.start] = true;
        times[time.end] = true;
    });
});

var timelist = [];
for (var i in times) timelist.push(i);
timelist.sort();
timelist.map((time, index) => times[time] = index + 1);

var table = [];
table.push([{}].concat(movies.map(movie => {
    return {
        textContent: movie.name
    }
})));

var timerow = {};
timelist.map(time => {
    var date = new Date(parseInt(time));
    table.push([{
        textContent: pad(date.getHours(), 2) + "：" + pad(date.getMinutes(), 2),
        onload: function (td, tr) {
            timerow[time] = tr;
        }
    }].concat(movies.map(x => {
        x.tds = [];
        return {
            onload: function (td) {
                x.tds.push(td);
            }
        }
    })));
});



movies.map((movie, i) => {
    movie.selectedTime = -1;
    movie.times.map((time, j) => {
        var start = times[time.start];
        var end = times[time.end];
        var x = i + 1;
        table[start][x] = {
            rowSpan: end - start,
            style: { background: "gray" },
            onload: function (element) {
                time.element = element;
            },
            onclick: function () {
                if (movie.selectedTime != j) movie.selectedTime = j;
                else movie.selectedTime = -1;
                update();
            }
        };
        for (var y = start + 1; y < end; y++) table[y][x].hidden = true;
    })
});

function timeIntersect(a, b) {
    return a.end > b.start && a.start < b.end;
}

function update() {
    var regTimes = [];
    movies.map(movie => {
        if (movie.selectedTime != -1)
            regTimes.push(movie.times[movie.selectedTime]);
    });
    movies.map(movie => {
        movie.tds.map(td => td.style.backgroundColor = "");
        movie.times.map((time, i) => {
            var color = "gray";
            var selected = false;
            if (i == movie.selectedTime) {
                selected = true;
                color = "green";
                movie.tds.map(td => td.style.backgroundColor = "lightgreen");
            }
            regTimes.map(rtime => {
                if (rtime != time && timeIntersect(time, rtime)) {
                    if (selected) {
                        movie.tds.map(td => td.style.backgroundColor = "pink");
                        color = "red";
                    } else color = "black";

                }
            });
            time.element.style.backgroundColor = color;
        });
    });

    for (var i in timerow) timerow[i].style.backgroundColor = "white";

    regTimes.map(time => {

        timelist.map(time2 => {
            if (time2 >= time.start && time2 < time.end) timerow[time2].style.backgroundColor = "lightgray";
        });
    });
}


function attcopy(from, to) {
    for (var i in from) {
        if (from[i] instanceof Function) to[i] = from[i];
        else if (from[i] instanceof Object) attcopy(from[i], to[i] || (to[i] = {}));
        else to[i] = from[i];
    }
}

var wtable = w.document.createElement("table");
table.map(row => {
    var tr = w.document.createElement("tr");
    row.map(data => {
        var td = w.document.createElement("td");
        td.style.border = "solid lightgray";
        td.style.padding = "5px";
        attcopy(data, td);
        tr.appendChild(td);
        if (data.onload instanceof Function) data.onload(td, tr);
    });
    wtable.appendChild(tr);
});



wtable.style.borderCollapse = "collapse";
w.document.body.appendChild(wtable);

/*

─█████───█████──
───█████───█████

*/