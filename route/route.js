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

module.exports = function (app) {
    app.post('/api/upload', function (req, res){
        var form = new formidable.IncomingForm();
    
        form.parse(req);
        form.maxFieldsSize = 2 * 1024 * 1024 * 1024;
        form.multiples = true;
        form.on('fileBegin', function (name, file){
            file.path = __dirname + '/uploads/' + file.name;
        });
        // form.on('progress', function (name, file){
        //     res.writeHeader(200, ({
        //         'Content-Type': 'text/html'
        //     }));
        //     var index = fs.readFileSync(__dirname + '/fileuploading.html', 'utf-8');
        //     res.end(index);
        // })
        form.on('file', function (name, file){
            console.log('Uploaded ' + file.name);
        });
        form.on('error', function(err) {
            console.log('an error has occured while uploading')
        });
        form.on('end', function(name, file) {
            res.redirect('/api');
        });
    
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
}