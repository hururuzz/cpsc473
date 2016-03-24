var data = require('./db.json');

var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(3000, function(){
   console.log('The server is listening 3000'); 
});

app.post('/flip', function(req, res){
    var side = req.body.call;
    var result = "win";
    //console.log(side);
    
    //make random integer number
    var randomNumber = (Math.random() * 10).toFixed(0);
    
    //if the number is even, random side would be head and tail for odd
    if(randomNumber%2 === 0)
        var randomSide = "heads";
    else
        var randomSide = "tails";
        
    if (side === randomSide)
    {
        result = "win";
        data.stats.wins += 1;
    }
    else
    {
        result = "lose";
        data.stats.loses += 1;
    }
       
    console.log("Call: " + side + " | " + "Random Side: " + randomSide + " | Result: " + result);
    
});

app.get('/stats',function(req, res){    
    //console.log("Wins: " + data.stats.wins + " | " + "Loses: " + data.stats.loses);
    console.log(data.stats);
});