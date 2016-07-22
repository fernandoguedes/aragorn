'use strict';

let expect = require('chai').expect;
let path = require('path');

// Import classes for testing
let MainAPI = require(path.join(__dirname, '../../modules', 'main.api.class'));

describe('MainAPI', () => {

    it('getSchedule(): Returns JSON schedule of cinema', (done) => {
        let API = new MainAPI();
        let cinema = 'cinemark';

        API.getSchedule(cinema)
            .then(function(json) {
                console.log(json);
                done();
            })
            .catch(function(err) {
                console.log(err);
                done();
            });
    });
});
