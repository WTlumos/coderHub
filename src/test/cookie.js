const koa = require("koa");
const app = new koa();

const Router = require("koa-router");
const loginRouter = new Router();

loginRouter.get("/login",(ctx,next)=>{
    ctx.cookies.set("name","lilei",{
        /**
         * a number representing the milliseconds from Date.now() for expiry
         */
        maxAge: 5 * 1000
    });
    ctx.body = "设置cookie";
});

const useRouter = new Router();

useRouter.get("/use",(ctx,next)=>{
    const name = ctx.cookies.get("name");
    ctx.body = name;
});

app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

app.use(useRouter.routes());
app.use(useRouter.allowedMethods());

app.listen(8989,()=>{
    console.log("开启 8989");
})