var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();

//connect to default port of mongodb
mongoose.connect('mongodb://localhost:27017');

//schema model for the list
var LinkListSchema = mongoose.Schema({
    title: String,
    link: String,
    clicks: Number
});

var LinkList = mongoose.model("LinkList", LinkListSchema);

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(8000, function(){
   console.log('The server is listening 8000'); 
});


app.get('/links', function(req, res){
    LinkList.find({},{ __v: 0, _id: 0 }, function(err, result){
        if(err !== null){
          console.log(err);
        } else{
          console.log(result);  
        }
    });
});

app.get('/click/:title', function(req, res){
   LinkList.update(
       {title: req.params.title},
       {
           //used $inc function that automatically increase clicks by 1
           $inc: {clicks: 1}
       }, function(err){
           if(err !== null){
               console.log(err);
           } else{
             console.log("Successfully Updated.");
             
             //get link address and redirect
             LinkList.find({title: req.params.title}, {link: 1}, function(err, result){
                res.redirect(result[0].link);
             });
           }
       }
   );
});

app.post('/links', function(req, res){
    var newList = new LinkList({'title': req.body.title, 'link': req.body.link, 'clicks': 0});
    
    newList.save(function(err, result){
       if(err !== null){
           console.log(err)
       } else{
           console.log("Successfully Saved!");
       }
    });
});