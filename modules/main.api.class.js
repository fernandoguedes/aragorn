'use strict';

// Require node_modules dependencies
let path = require('path');
let mongoose = require(path.join(__dirname, '../db/', 'mongoose.conf'));

// Import schemas
let schedulesSchema = require(path.join(__dirname, '../db/schemas/', 'schedule'));

module.exports = class MainAPI {

    /**
     * @apiVersion 0.0.1
     * @api {get} /progracao/cinema/:cinema/cidade/:cidade getSchedule
     * @apiGroup Schedule
     * @apiDescription Retorna programação disponível do cinema e cidade especificada
     * @apiName getSchedule
     * @apiParam {String} cinema Nome do cinema
     * @apiParam {String} cidade Nome da cidade
     * @apiExample {curl} Example usage:
     *     curl -i http://api.nocinema.info/programacao/cinemark/cidade/florianopolis
     * @apiSuccess {Object[]} schedules Array de programação de cinemas
     * @apiSuccess {String} schedules.cinema Nome do cinema
     */

    getSchedule(cinema, city) {

        return new Promise((resolve, reject) => {

            if (!cinema) {
                return reject(400, 'Solicitação incorreta, o parâmetro cinema é necessário.')
            }

            if (!city) {
                return reject(400, 'Solicitação incorreta, o parâmetro cidade é necessário.')
            }

            let today = this.getDate();

            let condition = {
                cinema: cinema,
                city_normalized : city,
                recorded: {
                    $gte: today
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

    /**
     * @apiVersion 0.0.1
     * @api {get} /progracao/cinema/:cinema getScheduleFromCinema
     * @apiGroup Schedule
     * @apiDescription Retorna programação disponível do cinema
     * @apiName getScheduleFromCinema
     * @apiParam {String} nome Nome normalizado ou não do cinema
     * @apiSuccessExample {json} Success-Response:
     *     HTTP/1.1 200 OK
     *     {
     *       "firstname": "John",
     *       "lastname": "Doe"
     *     }
     */
    getScheduleFromCinema(cinema) {

        return new Promise((resolve, reject) => {
            if (!cinema) {
                return reject(400, 'Solicitação incorreta, o parâmetro cinema é necessário.')
            }

            let today = this.getDate();

            let condition = {
                cinema: cinema,
                recorded: {
                    $gte: today
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

        return new Promise((resolve, reject) => {
            if (!city) {
                return reject(400, 'Solicitação incorreta, o parâmetro cidade é necessário.')
            }

            let today = this.getDate();

            let condition = {
                city_normalized: city,
                recorded: {
                    $gte: today
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

    getDate() {
        let now = Date.now();
        let oneDay = ( 1000 * 60 * 60 * 24 );
        let today = new Date(now - (now % oneDay));

        return today;
    }

}
