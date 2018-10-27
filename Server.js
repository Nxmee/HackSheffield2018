var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(path.join(__dirname, "")));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(request, response){
    response.sendFile(path.join(__dirname, "Main.html"));
});

var server = app.listen(8080, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Tetris listening at http://%s:%s", host, port);
});
server.timeout = 1000;
/*function isEmpty(str) {
    return (!str || 0 === str.length);
   if(isEmpty(name)) {
       response.send("Please make sure you enter your name.");
 }*/
