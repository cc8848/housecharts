// Requires \\
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var fs = require('fs');
var mongoose = require('mongoose');
var houseController = require('./controllers/houseController.js')

//var houseController = require('./controllers/houseController.js');

// Create Express App Object \\
var app = express();

// Application Configuration \\
mongoose.connect('mongodb://localhost/housesDB');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
  console.log("we are in the index route");
  //res.send("<h1>HELLO</h1>");
  res.sendFile('/html/index.html', {root : './public'});
});



app.post('/api/getYearBuilt', houseController.getYearBuilt);

app.post('/api/searchMany', houseController.getManyHouses);
app.post('/api/getAllPrices', houseController.getAllPrices);


app.post('/api/manySearch',houseController.getManyHouses);
app.post('/api/houseFind', houseController.getHouseByMLS);
app.post('/api/houseFind/Max', houseController.getHouseByMaxPrice);


//app.post('/api/country',countryController.getCountry);


// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})