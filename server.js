'use strict';

let restify = require('restify');
let path = require('path');
let server = restify.createServer();
let port = 3000;

let API = require(path.join(__dirname, '', 'index')).MainAPI;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.use(
  function crossOrigin(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    return next();
  }
);

server.get('/programacao/cinema/:cinema', function(req, res) {
    API.getScheduleFromCinema(req.params.cinema)
        .then(function(json) {
            res.send(200, json);
        })
        .catch(function(err) {
            res.send(err);
        });
});

server.get('/programacao/cinema/:cinema/cidade/:city', function(req, res) {
    API.getSchedule(req.params.cinema, req.params.city)
        .then(function(json) {
            res.send(200, json);
        })
        .catch(function(err) {
            res.send(err);
        });
});


server.get('/programacao/cidade/:city', function(req, res) {
    API.getScheduleFromCity(req.params.city)
        .then(function(json) {
            res.send(200, json);
        })
        .catch(function(err) {
            res.send(err);
        });
});

server.get('/programacao/cidade/:city/proxima', function(req, res) {
    API.getNextSessionByCity(req.params.city)
        .then(function(json) {
            res.send(200, json);
        })
        .catch(function(err) {
            res.send(err);
        });
});

server.listen(port, function() {
    console.log("Server started @ 3000");
});
