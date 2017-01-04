//log module
//it can log on console, or save log at some saver like nosql db or file system

//  level 1 :
//      Method + Url + Unix timestamp
//
//  level 2 :
//      Method + Url + Unix timestamp
//      + source IP + handle time
//
//  level 3 :
//      Method + Url + Unix timestamp
//      + source IP + handle time
//      + request body + resonse body

//  log saver
//      where to save log
//      default don't save
//
class Log {
    constructor(level = 3, logSaver = null) {
        this.level = level;
        this.saver = logSaver;
        this.printLog = this.printLog.bind(this);
        this.saveLog = this.saveLog.bind(this);
    }

    async log(ctx, next) {
        let log = {};
        let handleTime = {};

        //available at all levels
        const timestamp = Math.floor(new Date() / 1000);
        log.timestamp = timestamp;
        log.method = ctx.method
        log.url = ctx.url;

        if(this.level >= 2) {
            handleTime.start = new Date();
            log.ip = ctx.ip.substr(7);
        }

        await next();

        if(this.level >= 2) {
            log.time = Math.floor((new Date() - handleTime.start) / 1000) + 'ms';
        }

        if(this.level >= 3) {
            log.req = Object.keys(ctx.request.body).length > 0 ? ctx.request.body : null;
            log.res = ctx.body ? ctx.body : null;
            log.status = ctx.status;
        }

        return log;
    }

    async printLog() {
        const log = await this.log(...arguments);
        console.log(log);
    }

    async saveLog() {
        if(this.saver === null)
            throw new Error('no saver assigned');
        const log = await this.log(...arguments);
        console.log(this.saver);
        await this.saver.save(log);
    }
}

const log = function(level, logSaver) {
    return new Log(...arguments);
}
module.exports = log;