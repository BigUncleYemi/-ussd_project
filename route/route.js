var express = require('express'),
    app = express();
var bodyparser = require('body-parser'),
    urlencoded = bodyparser.urlencoded({
        extended: false
    });
var model = require('../model/model');
var mongoose = require('mongoose');
// Blacklist = mongoose.model('Blacklist'),
var Admin = mongoose.model('Admin');
var fs = require('fs');


module.exports = function (app) {
    app.get('/api', function (req, res) {
        res.writeHeader(200, ({
            'Content-Type': 'text/html'
        }));
        var index = fs.readFileSync(__dirname + '/index.html', 'utf-8');
        res.end(index);
    });
}