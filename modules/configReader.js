const fs = require('fs');
class ConfigReader {
    constructor() {
        fs.accessSync('./config.js');
        this.config = require('../config');
    }

    getLog(key) {
        return this.config.log[key];
    }
}

const cr = function(path) {
    return new ConfigReader(...arguments);
}

module.exports = cr;