//  level 1 :
//      Method + Url + Unix timestamp
//  level 2 :
//      Method + Url + Unix timestamp + source ip + handle time

const log = class Log {
    constructor(level = 2) {
        this.level = level;
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
}

//     // console.log(`${method} ${url} ${ip} ${time}ms ${ctx.status}`);
//     // console.log(`${JSON.stringify(ctx.request.body)}`);
//     // console.log(`${ctx.body}`);
// }


module.exports = log;