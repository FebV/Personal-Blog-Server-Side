//seperated log saver
//decouple the saver from log core

const fs = require('fs');
const configReader = require('./configReader')();
//log saver interface
//include implements like
//  FileLogSaver
//  MongoDBLogSaver
class LogSaver {
    constructor() {
        this.save = this.save.bind(this);
        this.checkAccess = this.checkAccess.bind(this);
    }

    async save(log) {
        //virtual function
    }
    async checkAccess(path) {
        //virtual function
    }
}


class FileLogSaver extends LogSaver {
    constructor() {
        super();
        this.dir = configReader.getLog('dir');
        this.filename = configReader.getLog('filename');

    }

    async save(log) {
        let result = await this.checkAccess(this.dir);
        if(!result) {
            await this.mkdir(this.dir);
        }
        await new Promise( (reslove, reject) => {
            fs.appendFile(this.dir + this.filename, `${JSON.stringify(log)}\n` , {}, err => {
                if(err)
                    reject('error occur when write log into file');
                else {
                    reslove();
                }
            });
        });
    }

    async checkAccess(path) {
        let result = false;
        await new Promise((resolve, reject) => {
            fs.access(path, err => {
                 result = err ? false : true;
                 resolve();
            })
        });
        return result; 
    }

//  private function
    async mkdir(path) {
        await new Promise((resolve, reject) => {
            fs.mkdir(path, err => {
                if(err)
                    reject(`error occur when make log dir at ${path}`);
                else {
                    resolve();
                }
            });
        });
    }
}

class MongoDBLogSaver extends LogSaver {
    constructor() {
        super();
    }

    async save(log) {
        const Log = require('../models/Log');
        let newLog = new Log({content: log});
        newLog.env = 'debug';
        await newLog.save();
    }

    async checkAccess(path) {
        return true;
    }
}

class RpcLogSaver extends LogSaver {
    constructor() {
        super();
    }

    async save(log) {
        const net = require('net');
        const client = net.createConnection({port: 8888}, () => {
            
            client.write(JSON.stringify(log)+'\r\n', () => {
                client.end();
            });
        
        });
    }
}

const logSaver = function(type) {
    if(type === 'file') {
        return new FileLogSaver();
    }

    if(type == 'db') {
        return new MongoDBLogSaver();
    }

    if(type == 'rpc') {
        return new RpcLogSaver();
    }

    throw new Error('no log saver assigned');
}

module.exports = logSaver;