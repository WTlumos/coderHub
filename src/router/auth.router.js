const Router = require("koa-router");
const { login, test } = require("../controller/auth.controller");
const { verifyLogin, verifyAuth } = require("../middleware/auth.middleware");

const authRouter = new Router({prefix: "/login"});

authRouter.post("/",verifyLogin,login);

authRouter.get("/test",verifyAuth,test);

module.exports = authRouter;