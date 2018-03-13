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
var formidable = require('formidable');
var csvjson = require('csvjson');
var path = require('path')

module.exports = function (app) {
    app.post('/api/upload', function (req, res) {
        var form = new formidable.IncomingForm();

        form.parse(req);
        form.maxFileSize = 2 * 1024 * 1024 * 1024;
        form.multiples = true;
        form.on('fileBegin', function (name, file) {
            file.path = __dirname + '/uploads/' + file.name;
        });
        form.on('file', function (name, file) {
            console.log('Uploaded ' + file.name);
            var data = fs.readFileSync(path.join(__dirname + '/uploads/' + file.name), {
                encoding: 'utf8'
            });
            var options = {
                delimiter: ',',
                quote: '"'
            };
            var conv = csvjson.toSchemaObject(data, options);
            console.log(conv)

            for (var i = 0; i < conv.length;) {
                var new_blacklist = new Blacklist(conv[i]);
                new_blacklist.save(function (err, results) {
                    if (err) {
                        console.log(`error - ${JSON.stringify(err)}`);

                    } else {
                        Blacklist.count((err, count) => {
                            console.log(`Count - ${count}`);
                        });
                        console.log(`results - ${JSON.stringify(results)}`);
                        res.json({
                            message: "Sucessful."
                        });
                        console.log(req.body)
                        next(err)
                    }
                })
                i++
            }
        });
        form.on('error', function (err) {
            console.log('an error has occured while uploading')
        });
        console.log(form);
        res.sendFile(__dirname + '/index.html');

    });

    app.post('/api/sucessful', urlencodedparser, function (req, res, next) {
        var new_blacklist = new Blacklist(req.body);
        new_blacklist.save(function (err, results) {
            if (err) {
                console.log(`error - ${JSON.stringify(err)}`);
                next(err)

            } else {
                Blacklist.count((err, count) => {
                    console.log(`Count - ${count}`);
                });
                console.log(`results - ${JSON.stringify(results)}`);
                res.json({
                    results,
                    message: "Sucessful."
                });
                console.log(req.body)
            }
        })
    });



    app.get('/api', function (req, res) {
        res.writeHeader(200, ({
            'Content-Type': 'text/html'
        }));
        var index = fs.readFileSync(__dirname + '/index.html', 'utf-8');
        res.end(index);
    });

    app.get('/api/search', function (req, res) {
        res.writeHeader(200, ({
            'Content-Type': 'text/html'
        }));
        var search = fs.readFileSync(__dirname + '/search.html', 'utf-8');
        res.end(search);
    });

    app.get('/api/search/list', function (req, res) {
        Blacklist.find({}, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: 'could not get list'
                })
            } else {
                res.json({
                    results,
                    message: 'list found'
                })
            }
        })
    })
    app.get('/api/search/operator', function (req, res) {
        Blacklist.find({
            operator: req.query.operator
        }, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: 'could not find results'
                })
            } else {
                res.json({
                    results,
                    message: 'search completed'
                })
            }
        }).count((err, count) => {
            console.log(`Count - ${count}`);
        });
    })
    app.get('/api/search/MSISDN', function (req, res) {
        Blacklist.find({
            MSISDN: req.query.MSISDN
        }, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: 'could not find results'
                })
            } else {
                res.json({
                    results,
                    message: 'search completed'
                })
            }
        }).count((err, count) => {
            console.log(`Count - ${count}`);
        });
    })
    app.get('/api/search/categories', function (req, res) {
        Blacklist.find({
            categories: req.query.categories
        }, function (err, results) {
            if (err) {
                res.json({
                    status: false,
                    error: 'could not find results'
                })
            } else {
                res.json({
                    results,
                    message: 'search completed'
                })
            }
        }).count((err, count) => {
            console.log(`Count - ${count}`);
        });
    })
}