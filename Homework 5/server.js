var data = require('./db.json');

var http = require('http');
var express = require('express');
var bodyParser = require("body-parser")
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, function(){
   console.log('The server is listening 3000'); 
});

app.post('/flip', function(req, res){
    var side = req.body;
    console.log(side);
    
    /*
    if((Math.random() * 10) % 2 !== 0)
        var side = "head";
    else
        var side = "tail";
        
    if (call === side)
        data.result.push("win");
    else
        data.result.push("lose");
     */
    
});

app.get('/stats',function(req, res){    
    console.log(data.stats);
});