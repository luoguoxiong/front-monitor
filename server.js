//引入 koa模块

var Koa = require("koa");

var router = require("koa-router")(); /*引入是实例化路由** 推荐*/

const koaBody = require("koa-body");
//实例化
const static = require("koa-static");
var app = new Koa();
app.use(static(__dirname + "/build"));

app.use(koaBody());

const getData = () => {
  return new Promise((res) => {
    setTimeout(() => {
      res(2);
    }, 2000);
  });
};
router.get("/api/abc", async (ctx) => {
  await getData();
  ctx.body = { a: 2 };
});

app.use(router.routes()); /*启动路由*/
app.use(router.allowedMethods());
app.listen(8080);
