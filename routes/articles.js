const router = require('koa-router')();
const col = require('../modules/dbConnect');

router.get('/', 
    async (ctx, next) => {
        let articleCol = await col('articles');
        const articles = await articleCol.find();
        const a = await articles.toArray();
        ctx.body = a;
    }
)

router.post('/', 
    (ctx, next) => {
        ctx.body = 'post article';
    }
)
module.exports = router;