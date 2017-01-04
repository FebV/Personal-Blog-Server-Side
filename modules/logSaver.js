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
        console.log('file log save');
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
}

const logSaver = function(type) {
    if(type === 'file') {
        return new FileLogSaver();
    }
}

module.exports = logSaver;