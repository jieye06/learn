const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router')
const koaBody = require('koa-body')
const router = new Router()
const sql = require('../behind/mysql')


app.use(router['routes']()).use(router.allowedMethods());
router.post('/api/add', koaBody(), async (ctx, next) => { //登录接口
	ctx.set("Access-Control-Allow-Origin", "*");
	var loginbody = ctx.request.body;
	var logintemp = await sql.insertWholeData(loginbody).then(function(result) {
		console.log(result);
	}, function(error) {
		cxt.throw(500)
	});
	ctx.body = logintemp;
})

router.post('/api/login', koaBody(), async (ctx, next) => { //登录接口
	ctx.set("Access-Control-Allow-Origin", "*");
	var loginbody = ctx.request.body;
	var logintemp = await sql.isExist(loginbody, 'user').then(function(result) {
		ctx.body = result
	}, function(error) {
		cxt.throw(500)
	});
})

app.listen(3000);
