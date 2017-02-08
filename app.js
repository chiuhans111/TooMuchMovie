var express = require('express');
var app = express();
var bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(__dirname + "/public"));

app.get("/cor", function (req, res) {
    console.log(req.body);
    res.send(JSON.stringify(req.body));
});

app.listen(25565, "localhost");