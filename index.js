'use strict';

// Require node_modules dependencies
let path = require('path');

// Require other classes, files or configs
let MainAPI = require(path.join(__dirname, 'modules', 'main.api.class'));

module.exports = {
    API: new MainAPI()
}
