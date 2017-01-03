const Koa = require('koa');
const app = new Koa();
const koaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');

const Log = require('./modules/log');
const LogSaver = require('./modules/logSaver');

const router = koaRouter({prefix: '/api'});
const articles = require('./routes/articles');


router.get('/', (ctx, next) => {
    ctx.body = 'welcome to my personal blog api index, see project at https://github.com/FebV/Personal-Blog-Server-Side';
});


router.use('/articles', articles.routes());

//log module
const log = new Log();
const logSaver = new LogSaver({type: 'file', logDir: './log/'});
log.level = 3;
log.saver = logSaver;
// log.saver.chechDirExist('./log/').then(param => {
//     console.log(param);
// });
app.use( log.saveLog );

//body parser
app.use(bodyParser());

//register routers
app.use(router.routes());

app.listen(3000);