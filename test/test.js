'use strict'

var chai = require('chai');
var app = require('../server').app;
var server = require('../server').server;
var request = require("supertest").agent(server);

var expect = chai.expect;

describe('# Api Test', function () {

    var blacklist = {
        MSISDN : ''
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
    describe('# Post CSV manually inputed ')

})