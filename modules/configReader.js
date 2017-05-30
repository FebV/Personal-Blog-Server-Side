//read consif.js as a object to get value conveniently

const fs = require('fs');
class ConfigReader {
    constructor() {
        fs.accessSync('./config.js');
        this.config = require('../config');
    }

    getLog(key) {
        return this.config.log[key];
    }

    getMongoDb(key) {
        return this.config.mongodb[key];
    }
}

const cr = function(path) {
    return new ConfigReader(...arguments);
}

module.exports = cr;