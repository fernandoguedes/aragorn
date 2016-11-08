'use strict';

// Require node_modules dependencies
let path = require('path');
let mongoose = require(path.join(__dirname, '../db/', 'mongoose.conf'));

// Import schemas
let schedulesSchema = require(path.join(__dirname, '../db/schemas/', 'schedule'));

module.exports = class MainAPI {

    /**
     @apiVersion 0.0.1
     @api {get} /progracao/cinema/:cinema/cidade/:cidade getSchedule
     @apiGroup Schedule
     @apiDescription Retorna a programação diária do cinema e aplicando filtro de acordo com a cidade especificada
     @apiName getSchedule
     @apiParam {String} cinema Nome do cinema
     @apiParam {String} cidade Nome da cidade
     @apiExample {curl} Example usage:
         curl -i http://api.nocinema.info/programacao/cinema/cinesystem/cidade/florianopolis
	 @apiSuccessExample {json} Success-Response:
	     HTTP/1.1 200 OK
		 [
		     {
		         "_id": "581cc3de7a956376dda62c65",
		         "__v": 0,
		         "cinema": "cinesystem",
		         "city": "Florianópolis",
		         "city_normalized": "florianopolis",
		         "place": "Shopping Center Iguatemi",
		         "place_normalized": "shopping center iguatemi",
		         "recorded": "2016-11-04T17:22:38.118Z",
		         "sessions": [
		             {
		                 "title": "A Garota no Trem",
		                 "censorship": null,
		                 "special": false,
		                 "_id": "581cc3de7a956376dda62c6e",
		                 "hours": [
		                     "16:45",
		                     "19:05",
		                     "21:25"
		                 ]
		             },
		             {
		                 "title": "A Luz entre Oceanos",
		                 "censorship": null,
		                 "special": false,
		                 "_id": "581cc3de7a956376dda62c6d",
		                 "hours": [
		                     "18:10",
		                     "20:50"
		                 ]
		             }
		         ]
		     }
		 ]
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
     @apiVersion 0.0.1
     @api {get} /progracao/cinema/:cinema getScheduleFromCinema
     @apiGroup Schedule
     @apiDescription Retorna a programação diária das salas disponíveis em todo o território brasileiro
     @apiName getScheduleFromCinema
     @apiParam {String} cinema Nome do cinema
     @apiExample {curl} Example usage:
         curl -i http://api.nocinema.info/programacao/cinema/cinesystem
	 @apiSuccessExample {json} Success-Response:
	     HTTP/1.1 200 OK
		 [
		     {
		         "_id": "581cc3de7a956376dda62c49",
		         "__v": 0,
		         "cinema": "cinesystem",
		         "city": "Curitiba",
		         "city_normalized": "curitiba",
		         "place": "Shopping Cidade",
		         "place_normalized": "shopping cidade",
		         "recorded": "2016-11-04T17:22:38.102Z",
		         "sessions": [
		             {
		                 "title": "Doutor Estranho",
		                 "censorship": null,
		                 "special": false,
		                 "_id": "581cc3de7a956376dda62c51",
		                 "hours": [
		                     "17:10",
		                     "19:40"
		                 ]
		             },
		             {
		                 "title": "Doutor Estranho",
		                 "censorship": null,
		                 "special": true,
		                 "_id": "581cc3de7a956376dda62c50",
		                 "hours": [
		                     "14:00",
		                     "16:30",
		                     "19:00",
		                     "21:30"
		                 ]
		             }
		         ]
		     },
		     {
		         "_id": "581cc3de7a956376dda62c52",
		         "__v": 0,
		         "cinema": "cinesystem",
		         "city": "Curitiba",
		         "city_normalized": "curitiba",
		         "place": "Shopping Curitiba",
		         "place_normalized": "shopping curitiba",
		         "recorded": "2016-11-04T17:22:38.105Z",
		         "sessions": [
		             {
		                 "title": "A Garota no Trem",
		                 "censorship": null,
		                 "special": false,
		                 "_id": "581cc3de7a956376dda62c5b",
		                 "hours": [
		                     "20:30"
		                 ]
		             },
		             {
		                 "title": "Doutor Estranho",
		                 "censorship": null,
		                 "special": false,
		                 "_id": "581cc3de7a956376dda62c5a",
		                 "hours": [
		                     "18:10"
		                 ]
		             }
		         ]
		     }
		 ]
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

	/**
     @apiVersion 0.0.1
     @api {get} /progracao/cidade/:cidade getScheduleFromCity
     @apiGroup Schedule
     @apiDescription Retorna a programação diária dos cinemas da cidade especificada como parâmetro
     @apiName getScheduleFromCity
     @apiParam {String} cidade Nome da cidade
     @apiExample {curl} Example usage:
         curl -i http://api.nocinema.info/programacao/cidade/florianopolis
	 @apiSuccessExample {json} Success-Response:
	     HTTP/1.1 200 OK
		 [
		     {
		         "_id": "581cc3de7a956376dda62c65",
		         "__v": 0,
		         "cinema": "cinesystem",
		         "city": "Florianópolis",
		         "city_normalized": "florianopolis",
		         "place": "Shopping Center Iguatemi",
		         "place_normalized": "shopping center iguatemi",
		         "recorded": "2016-11-04T17:22:38.118Z",
		         "sessions": [
		             {
		                 "title": "A Garota no Trem",
		                 "censorship": null,
		                 "special": false,
		                 "_id": "581cc3de7a956376dda62c6e",
		                 "hours": [
		                     "16:45",
		                     "19:05",
		                     "21:25"
		                 ]
		             },
		             {
		                 "title": "A Luz entre Oceanos",
		                 "censorship": null,
		                 "special": false,
		                 "_id": "581cc3de7a956376dda62c6d",
		                 "hours": [
		                     "18:10",
		                     "20:50"
		                 ]
		             }
		         ]
		     }
		 ]
	*/
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
