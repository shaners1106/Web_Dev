/*
Matthew Lochridge, Ryan Grady and Shane Snediker
Dr. Jones CS 301
GP6 Final Project
SkillsUSA Programming Competition website
Last updated: January 24, 2021

This is the main JavaScript file for initiating a node.js server

*/ 

// Initialize the variables that are required to start node server
var express = require('express');
var formidable = require('formidable');
var app = express();

// Declare the static files needed for accessing web pages
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/img', express.static(__dirname + 'public/img'));
app.use('/js', express.static(__dirname + 'public/js'));

// Set up views
app.set('views', './views');
app.set('view engine', 'ejs');

// Make sure to get each webpage
app.get('', function (req, res){
    res.render('index');
});
app.get('/quiz', function (req, res){ 
    res.render('quiz');
});
app.get('/prompts', function (req, res){
    res.render('prompts');
});

// Set post data handling 
app.post('/', function (req, res){
    // Capture the form object
    var form = new formidable.IncomingForm();
    // Parse form object
    form.parse(req);
    // Once the student chooses a file, send it to the appropriate server directory
    form.on('fileBegin', function (name, file){
        file.path = __dirname + '/uploads/' + file.name;
    });
    // As soon as the file has been uploaded, print the details to the console
    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });
    // After a prompt has been submitted, re-render the prompts page
    res.render('prompts');
});


// Set up the server on a local port
app.listen(3500, () => console.log("Node.js Express currently tuned into local host 3500"));