var express = require('express');
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var app = express();
var route = require('./route/route');

var port = process.env.PORT || (process.argv[2] || 3000);
port = (typeof port === "number") ? port : 3000;

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

require('./model/model');