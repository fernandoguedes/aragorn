'use strict';

// Require node_modules dependencies
let path = require('path');
let mongoose = require(path.join(__dirname, '../db/', 'mongoose.conf'));

// Import schemas
let schedulesSchema = require(path.join(__dirname, '../db/schemas/', 'schedule'));

module.exports = class MainAPI {

    getSchedule(cinema, city) {
        return new Promise(
            function (resolve, reject) {

                if (!cinema) {
                    return reject(400, 'Solicitação incorreta, o parâmetro cinema é necessário.')
                }

                if (!city) {
                    return reject(400, 'Solicitação incorreta, o parâmetro cidade é necessário.')
                }

                let condition = {
                    cinema: cinema,
                    city_normalized : city,
                    recorded: {
                        $lte: new Date()
                    }
                };

                schedulesSchema.find(condition).lean().exec(function(err, resultsArr) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(resultsArr);
                });
            });
    }

    getScheduleFromCinema(cinema) {
        return new Promise(
            function (resolve, reject) {

                if (!cinema) {
                    return reject(400, 'Solicitação incorreta, o parâmetro cinema é necessário.')
                }

                let condition = {
                    cinema: cinema,
                    recorded: {
                        $lte: new Date()
                    }
                };

                schedulesSchema.find(condition).lean().exec(function(err, cinemaObj) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(cinemaObj);
                });
            });
    }

    getScheduleFromCity(city) {
        return new Promise(
            function (resolve, reject) {

                if (!city) {
                    return reject(400, 'Solicitação incorreta, o parâmetro cidade é necessário.')
                }

                let condition = {
                    city_normalized: city,
                    recorded: {
                        $lte: new Date()
                    }
                };

                schedulesSchema.find(condition).lean().exec(function(err, cinemaObj) {
                    if (err) {
                        return reject(err);
                    }

                    return resolve(cinemaObj);
                });
            });
    }

}
