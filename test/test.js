'use strict'

var chai = require('chai');
var app = require('../server').app;
var server = require('../server').server;
var request = require("supertest").agent(server);

var expect = chai.expect;

describe('# Api Test', function () {

    var blacklist = {
        'MSISDN': '2349058165478',
        'operator': 'glo',
        'categories': 'Health'
    }

    // var test = require('./test.csv')

    describe('# Render form page', function () {
        after(function (done) {
            server.close();
            done();
        });
        it('should render the form page', function (done) {
            request.get('/api').end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                done();
            })
        })
    })
    describe('# Post all maually inputed CSV ', function () {
        after(function (done) {
            server.close();
            done();
        });
        it('should post form details', function (done) {
            request.post('/api/sucessful').send(blacklist).end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.message).to.be.equal('Sucessful.')
                done();
            })
        })
    });

    // describe('# UPload all CSV file and read it', function(){
    //     after(function(done){
    //         server.close();
    //         done();
    //     });
    //     it('should recieve csv file and upload its', function (done) {
    //         request.post('/api/upload').send('test').end(function(err,res){
    //             expect(res.statusCode).to.be.equal(200);
    //             done();
    //         })
    //     })
    // })

    describe('# Get the full Blacklist', function () {
        after(function (done) {
            server.close();
            done();
        })
        it('should get full Blacklist files', function(done){
            request.get('/api/search/list').end(function (err,res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body.message).to.be.equal('list found');
                console.log(res.body);
                done();
            })
        })
    })

})