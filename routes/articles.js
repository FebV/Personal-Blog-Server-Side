const router = require('koa-router')();
const col = require('../modules/dbConnect');
const Article = require('../models/Article');

router.get('/', 
    async (ctx, next) => {
        const article = await Article.getAll();
        ctx.stdResponse({data: article});
    }
)

router.post('/', 
    async (ctx, next) => {
        const article = new Article(ctx.request.body);
        await article.save();
        ctx.stdResponse({});
    }
)
module.exports = router;