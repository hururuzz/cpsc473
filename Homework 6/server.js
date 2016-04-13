var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var redis = require('redis');
var redisClient = redis.createClient();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(8000, function(){
   console.log('The server is listening 8000'); 
});

var randomizeSide = function(){
    //make random integer number
    var randomNumber = (Math.random() * 10).toFixed(0);
    
    //if the number is even, random side would be head and tail for odd
    if(randomNumber%2 === 0)
        return "head";
    else
        return "tail";
};

app.post('/flip', function(req, res){
    //Request value (head or tail)
    var side = req.body.call;
    
    //initialize result value to win
    var result = "win";
    
    // assign randomized value
    var randomSide = randomizeSide();
        
    if (side === randomSide)
    {
        result = "win";
        redisClient.incr("wins");    
    }
    else
    {
        result = "lose";
        redisClient.incr("loses"); 
    }
       
    console.log("Call: " + side + " | " + "Random Side: " + randomSide + " | Result: " + result);
    
});

app.get('/stats',function(req, res){    
    //get number of wins
    redisClient.get("wins", function(err, res){
       console.log("Wins: " + res); 
    });
    
    //get number of loses
    redisClient.get("loses", function(err, res){
       console.log("Loses: " + res); 
    });
});

app.delete('/stats',function(req, res){
  redisClient.set("wins", 0);
  redisClient.set("loses", 0);
  console.log("Stats have been reset.");
});