const router = require('koa-router')();


router.get('/', 
    (ctx, next) => {
        ctx.body = 'all articles';
    }
)
module.exports = router;