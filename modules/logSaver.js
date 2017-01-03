//save log to local disk
//log : plain object => file or db
//log dir must go with the last slash
const fs = require('fs');

const logSaver = class LogSaver {
    constructor({type = 'file', logDir = __dirname+'/../log/'}) {
        this.type = 'file';
        this.dir = logDir;
        this.filename = 'api.log';

        this.save = this.save.bind(this);
        this.checkDirExist = this.checkDirExist.bind(this);
        this.mkdir = this.mkdir.bind(this);
    }

    async save(log) {
        console.log(this.type);
        if(this.type === 'file') {
            let result = await this.checkDirExist(this.dir);
            console.log(result);
            if(!result) {
                await this.mkdir(this.dir);
            }
            await new Promise( (reslove, reject) => {
                fs.appendFile(this.dir + 'api.log', `${JSON.stringify(log)}\n` , {}, err => {
                    if(err)
                        reject('error occur when write log into file');
                    else {
                        reslove();
                    }
                });
            });
        }
    }
    async checkDirExist(path) {
        let result = false;
        await new Promise((resolve, reject) => {
            fs.access(path, err => {
                 result = err ? false : true;
                 resolve();
            })
        });
        return result; 
    }

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

    async testCheckDirExist() {
        console.log(await this.chechDirExist('../log/'));
    }
}

function test() {
    new logSaver({type: 'file'}).testCheckDirExist();//save({qwe: 'qwe'});
}

// test();

module.exports = logSaver;