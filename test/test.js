'use strict'

var chai = require('chai');
var app = require('../server').app;
var server = require('../server').server;
var request = require("supertest").agent(server);

var expect = chai.expect;

describe('# Api Test', function () {

    var blacklist = {
        MSISDN : '2349058165478',
        Operator : 'glo',
        Categories : 'Health'
    }
    describe('# Render form page', function () {
        after(function (done) {
            server.close();
            done();
        });
        it('should render the form page', function(done) {
            request.get('/api').end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                done();
            })
        })
    })
    describe('# Post CSV manually inputed', function () {
        after(function (done) {
            server.close();
            done();
        });
        it(' should get manually inputted details', function (done) {
            request.post('/api/sucessful').send(blacklist).end(function (err, res) {
                expect(res.statusCode).to.be.equal(200);
                expect(res.body).to.be.equal('object');
                blacklist = res.body;
                done();
            })
        })
    })

})