'use strict';

let expect = require('chai').expect;
let path = require('path');
let mongoose = require('mongoose');

// Import classes for testing
let API = require(path.join(__dirname, '../../', 'index')).MainAPI;

// Import schemas and mocks
let schedulesSchema = require(path.join(__dirname, '../../db/schemas/', 'schedule'));
let mocks = require(path.join(__dirname, '../', 'mocks'));

describe('MainAPI', () => {

    before(function() {
        // Remove all elements to execute tests
        schedulesSchema.remove({}, function(err) {
            if (err) {
                console.log(err);
            }

            schedulesSchema.insertMany(mocks.schedule, (err, docs) => {
              if (err) {
                  console.log(err);
              }

            });

        });
    });

    it('getSchedule(): Returns JSON schedule according with cinema and city', (done) => {
        let cinema = 'cinemark';
        let city = 'Foz do Iguaçu';

        API.getSchedule(cinema, city)
            .then(function(json) {
                done();
            })
            .catch(done);
    });

    it('getScheduleFromCity(): Returns JSON schedule accordint with city', (done) => {
        let city = 'Foz do Iguaçu';

        API.getScheduleFromCity(city)
            .then(function(json) {
                done();
            })
            .catch(done);
    });

    it('getScheduleFromCinema(): Returns JSON schedule accordint with city', (done) => {
        let cinema = 'cinemark';

        API.getScheduleFromCinema(cinema)
            .then(function(json) {
                done();
            })
            .catch(done);
    });
});
