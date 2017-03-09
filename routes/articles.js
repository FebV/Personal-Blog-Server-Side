const router = require('koa-router')();
const col = require('../modules/dbConnect');

router.get('/', 
    async (ctx, next) => {
        let articleCol = await col('article');
        const articles = articleCol.find();
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