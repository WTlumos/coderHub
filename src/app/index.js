const koa = require("koa");
const app = new koa();

// 解析 json
const bodyparser = require("koa-bodyparser");
const useRoutes = require("../router");

// 错误处理
const errorHandler = require("./errorHandler");


app.use(bodyparser());
// 注册路由
app.useRoutes = useRoutes;
app.useRoutes();

// 处理错误信息
app.on("error",errorHandler);

module.exports = app;

