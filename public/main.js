
/*
林園：http://www.atmovies.com.tw/showtime/t02e02/a02/
湳山：http://www.atmovies.com.tw/showtime/t02f08/a02/
 */

var xhr = new XMLHttpRequest();


function request(method, url, data, callback) {
    xhr.open(method, url);
    xhr.onload = function () {
        callback(this.response);
    }
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
}

request("post", "/cor", { 
    url: "http://www.atmovies.com.tw/showtime/t02e02/a02/" 
}, function(data){
    console.log(data);
});
