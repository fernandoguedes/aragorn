'use strict';

let restify = require('restify');
let path = require('path');
let server = restify.createServer();
let port = 3000;

let MainAPI = require(path.join(__dirname, '', 'index')).API;

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.get('/schedule/:name', function(req, res) {
    MainAPI.getSchedule(req.params.name)
        .then(function(json) {
            res.send(200, json);
        })
        .catch(function(err) {
            console.log(err);
            res.charSet('utf-8');
            res.send(500);
        });
});

server.listen(port, function() {
    console.log("Server started @ 3000");
});
