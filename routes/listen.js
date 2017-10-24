const router = require('koa-router')();
const querystring = require('querystring');
const validator = require('validator')
const config = require('../config')
const fs = require('fs')

router.get('/listen/list',async function (ctx,next) {
    if (!ctx.req._parsedUrl.query) {
        ctx.body = "没有参数";
        return;
    }
    var params = querystring.parse(ctx.req._parsedUrl.query);
    let ListenDB = ctx.model("listen")
    let list = await ListenDB.getSourceList(params.type)
    if(list){
        return ctx.body={
            success:true,
            data:list
        }
    }else{
        return ctx.body={
            success:false,
            msg:"获取列表失败！"
        }
    }
})
router.get('/listen/detail',async function (ctx,next) {
    if (!ctx.req._parsedUrl.query) {
        ctx.body = "没有参数";
        return;
    }
    var params = querystring.parse(ctx.req._parsedUrl.query);
    let ListenDB = ctx.model("listen")
    let detailInfo = await ListenDB.getDetail(params._id)
    if(detailInfo){
        return ctx.body={
            success:true,
            data:detailInfo
        }
    }else{
        return ctx.body={
            success:false,
            msg:"获取数据失败！"
        }
    }
})

router.get('/listen/audio',async function (ctx,next) {
    if (!ctx.req._parsedUrl.query) {
        ctx.body = "没有参数";
        return;
    }
    var params = querystring.parse(ctx.req._parsedUrl.query);
    ctx.body = fs.createReadStream(config.root+'/public/audio/'+params.audio);
    return next
})

module.exports = router;