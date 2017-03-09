const Koa = require('koa');
const app = new Koa();
const koaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');

const myLog = require('./modules/log');
const logSaver = require('./modules/logSaver');

const router = koaRouter({prefix: '/api'});
const articles = require('./routes/articles');

//log module at level 3, by file system
const log = myLog(3, logSaver('file'));
// app.use( log.printLog );
app.use( log.saveLog );


//a index
router.get('/', (ctx, next) => {
    ctx.body = 'welcome to my personal blog api index, see project at https://github.com/FebV/Personal-Blog-Server-Side';
});


//articles services
router.use('/articles', articles.routes());


//body parser
app.use(bodyParser());

//register routers
app.use(router.routes());

app.listen(3000);