'use strict';

let path = require('path');
let mongoose = require(path.join(__dirname, '../db/', 'mongoose.conf'));

// Import schemas
let schedulesSchema = require(path.join(__dirname, '../db/schemas/', 'schedule'));

module.exports = class MainAPI {

    getSchedule(cinema) {
        return new Promise(
            function (resolve, reject) {
                let cinemaStr = { 'name': cinema };
                schedulesSchema.find(cinemaStr).lean().exec(function(err, cinemaObj) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(cinemaObj);
                });
            });
    }

}
