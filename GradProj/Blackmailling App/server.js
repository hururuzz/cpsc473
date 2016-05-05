var express = require('express'),
    request = require('request'),
    bodyParser = require('body-parser'),
    http = require('http'),
    emailer = require('nodemailer'),
    cloudinary = require('cloudinary'),
    app = express();

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// vars for Couch DB
var dbUrl = 'http://localhost:5984/';
var db = 'blackmailapp/';

// api setup for Cloudinary
cloudinary.config({
    'cloud_name': 'dkvdao1nm',
    'api_key': '591527441213399',
    'api_secret': 'SZfdmt_vGv2i8HxYwp71f0TBQsE'
});

app.post('/blackmail/createblackmail', function(req, res){
    //used for id in couch db
    var id = Date.now();
    var pictureFile = __dirname + '/photos/' + req.body.incriminatingPicture;
    
    cloudinary.uploader.upload(pictureFile, function(result){
       console.log(result);
       var incriminatingPictureUrl = result.url;
       
       //insert data into couch DB
       request.put({
            url: dbUrl + db + id,
            header: 'Content-Type: application/json',
            body: {
                title: req.body.title,
                blackmailerName: req.body.blackmailerName,
                blackmailerEmail: req.body.blackmailerEmail,
                recipientEmail: req.body.recipientEmail,
                incriminatingPicture: incriminatingPictureUrl,
                demands: req.body.demands,
                releaseDateTime: req.body.releaseDateTime,
                isPublicized: 0
            },
            json: true
            }, function(req, res){
                if(res === null){
                    console.log('Error on database');
                }
                else{
                    console.log(res.body);
                }
        });
        
        //for SMTP feature
        var emailTransporter = emailer.createTransport('smtps://blackmailappcpsc473%40@gmail.com:cpsc12345!@smtp.gmail.com');  
        var mailOptions = {
            from: 'Blackmailapp Admin <blackmailappcpsc473@gmail.com>',
            to: req.body.recipientEmail,
            subject: 'Blackmail Arrived!',
            html: '<h1>'+ req.body.title + '</h1>' + '<h3>From: ' + req.body.blackmailerName + '<br>' + '<h3>Blackmailer Email: ' + req.body.blackmailerEmail +'<h3>Release Date: ' + new Date(req.body.releaseDateTime) + '<h3>Incriminating Picture: <br><img src="' + incriminatingPictureUrl + '" width="10%" height="10%"></img><br><a href="' + incriminatingPictureUrl + '" target="_blank">View Larger</a>'
        };

        emailTransporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            } 
            console.log('Message Sent!');
        }); 
        
        res.status(200).end();  
    });        
});


// Load script files when http server starts
app.use('/scripts', express.static('scripts', {index: false}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// use layout to shared common part of HTML (menu)
app.get('/', function(req,res){
   res.render('index.ejs', {layout: 'layout.ejs'});
});

app.get('/signin', function(req,res){
   res.render('signin.ejs', {layout: 'layout.ejs'});
});

app.get('/blackmail', function(req,res){
   res.render('blackmail.ejs', {layout: 'layout.ejs'});
});


app.listen(8000, function(){
   console.log('The server is listening port 8000');
});

