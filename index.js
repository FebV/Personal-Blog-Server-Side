const Koa = require('koa');
const app = new Koa();
const koaRouter = require('koa-router');
const router = koaRouter({prefix: '/api'});
const articles = require('./routes/articles');


router.get('/', (ctx, next) => {
    ctx.body = 'welcome to my personal blog api index, see project at https://github.com/FebV/Personal-Blog-Server-Side';
});
router.use('/articles', articles.routes());
// response
// app.use(ctx => {
//   ctx.body = 'Hello Koa@next';
// });
app.use(router.routes());

app.listen(3000);