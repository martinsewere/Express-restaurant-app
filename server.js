
// Initialize required packages

var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var nodemailer = require("nodemailer");


// Express set up
var app = express();
var port = process.env.PORT || 3000;


// nodemailer set up
var smtpConfig = {
	host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
  	username: "test415ha@gmail.com",
  	password: "Hangman1!"
	}
}

var transporter = nodemailer.createTransport(smtpConfig);

transporter.verify(function(error, success) {
	console.log("TESTING VERIFY");
  if (error) {
    console.log(error);
  } else {
    console.log("Success!");
  }
});

// Global variables
var tables = [];
var waitlist = [];
var incrementer = 0;


// bodyParser !!!
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.text());
// app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
// The default or Home page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "views/index.html"));
});


// The tables page that will hold tables
app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "views/tables.html"));
});

// The 
app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "views/reserve.html"));
});

// Listen function at given port; in this case, port variable is process.env.PORT || 3000;
app.listen(port, function() {
  console.log("App listening on PORT " + port);
});


// APIs

// Tables (get)
app.get('/api/tables', function(req, res) {
	return res.json(tables);
});

// Waitlist (get)
app.get('/api/waitlist', function(req, res) {
	return res.json(waitlist);
});

// New Reservation (post)
app.post('/api/newReservation', function(req, res) {
	var newTable = req.body;
  newTable.uniqueId = incrementer++;
  if (tables.length < 5) {
  	tables.push(newTable);
    newTable.onWaitlist = false;
  } else {
    waitlist.push(newTable);
    newTable.onWaitlist = true;
  }
  res.json(newTable);
});

// Clear (post?)
app.get('/api/clear', function(req, res) {
	return res.json(waitlist);
});

// Seed
app.get('/api/seed', function(req, res) {
	var tableSeed = [{
    name: "Michael",
    phone: "6514429511", 
    email: "michael.t.halvorson@gmail.com",
    uniqueId: -16
  },{
    name: "George",
    phone: "5555555555", 
    email: "gcyoosf@gmail.com",
    uniqueId: -15
  },{
    name: "Martins",
    phone: "3333333333", 
    email: "martins@gmail.com",
    uniqueId: -14
  }];
  var waitlistSeed = [{
    name: "MartinsWaitlist",
    phone: "3333333333", 
    email: "martins@gmail.com",
    uniqueId: -13
  },{
    name: "MichaelWaitlist",
    phone: "3333333333", 
    email: "michael.t.halvorson@gmail.com",
    uniqueId: -11
  }];
  tableSeed.forEach( function(obj) {
    tables.push(obj);
  });
  waitlistSeed.forEach( function(obj) {
    waitlist.push(obj);
  });
});