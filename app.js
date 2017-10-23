const Koa = require('koa')
const app = new Koa()
const router = require('koa-router')();
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const convert = require('koa-convert')
const session = require('koa-generic-session')
const config = require('./config');

// error handler
onerror(app)
app.keys = ['listener_nodejs_koa2'];
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//绑定mongodb
app.use(async (ctx, next) => {
    if(!ctx.model)
        ctx.model = require('./models');
    await next();
})

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
