var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();
var route = require('./route/route');
var fs = require('fs');

var port = process.env.PORT || (process.argv[2] || 3010);
port = (typeof port === "number") ? port : 3010;

var server = app.listen(port);
console.log("Application started. Listening on port:" + port);

module.exports = {
    server : server,
    app : app
};

var mongoUri = 'mongodb://localhost/Blacklistdb';
mongoose.connect(mongoUri);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + mongoUri);
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));

route(app);

app.use(function (req, res) {
  var four0four = fs.readFileSync(__dirname + '/404.html', 'utf-8')
  res.status(404).send(four0four)
  next();
});

app.use(function(err, req, res, next){
  if (res.err == [WritError]){
    res.send(`This name has already being blacklisted do you want to update it`);
  }
})
app.use(function(err, req, res, next){
  console.log(`Error -> ${err}`);
  res.send(`There is a problem somewhere but we are on it`);
});

require('./model/model');