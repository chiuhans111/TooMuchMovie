var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var http = require('http');

app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));

app.post("/cor", function (req, res) {
    http.get(req.url, function(res){
        res.on("data", function(data){
            res.send(data);
        });
    });
});

app.listen(25565, "localhost");
console.log("started");