var express = require('express'),
    app = express();
var bodyparser = require('body-parser');
var urlencodedparser = bodyparser.urlencoded({
    extended: false
});
var model = require('../model/model');
var mongoose = require('mongoose');
var Blacklist = mongoose.model('Blacklist');
var Admin = mongoose.model('Admin');
var fs = require('fs');


module.exports = function (app) {

    app.post('/api/sucessful', urlencodedparser, function (req, res) {
        var new_blacklist = new Blacklist(req.body);
        new_blacklist.save(function (err, list) {
            if (err) {
                err
            }
            res.json({
                list
                // message: "Sucessful."
            });
            console.log(req.body)
        })
    })

    app.get('/api', function (req, res) {
        res.writeHeader(200, ({
            'Content-Type': 'text/html'
        }));
        var index = fs.readFileSync(__dirname + '/index.html', 'utf-8');
        res.end(index);
    });
}