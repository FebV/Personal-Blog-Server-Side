const Koa = require('koa');
const app = new Koa();
const koaRouter = require('koa-router');
const bodyParser = require('koa-bodyparser');

const myLog = require('./modules/log');
const logSaver = require('./modules/logSaver');

const router = koaRouter({prefix: '/api'});
const articles = require('./routes/articles');
const comments = require('./routes/comments');

// log module at level 3, by file system
const log = myLog(3, logSaver('rpc'));
app.use( log.printLog );
app.use( log.saveLog );


//a index
router.get('/', (ctx, next) => {
    ctx.body = 'welcome to my personal blog api index, see project at https://github.com/FebV/Personal-Blog-Server-Side';
});


//articles services
router.use('/articles', articles.routes());
router.use('/articles/:articleId/comments', comments.routes());


//body parser
app.use(bodyParser());

// bind standard response format
app.use(async (ctx, next) => {
    ctx.stdResponse = ({code = 0, message = 'OK', data = null}) => {
        ctx.body = JSON.stringify({code, message, data});
    }
    await next();
})

//check dbConnect availability
app.use(async (ctx, next) => {
    try{
        const db = require('./modules/dbConnect');
        const status = await db('articles');
    }catch({message}){
        ctx.stdResponse({code: 1, message});
        //ctx.body = JSON.stringify({code: 1, message: 'Unable To Connect Database', data: null});
    }
    await next();
});


//register routers
app.use(router.routes());

app.listen(3000);