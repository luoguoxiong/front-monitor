//引入 koa模块

var Koa = require("koa");

var router = require("koa-router")(); /*引入是实例化路由** 推荐*/

const koaBody = require("koa-body");
//实例化
var app = new Koa();

app.use(koaBody());

router.post("/", async (ctx) => {
  console.log(ctx.request.body);
  ctx.body = ctx.request.body;
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(8080);
