const koa = require("koa");
const app = new koa();

const Router = require("koa-router");
const loginRouter = new Router();

const Session = require("koa-session");
const session = Session({
    key: "sessionid",
    /**
    * maxAge in ms 
    */
    maxAge: 10 * 1000,
    signed: true
},app);
app.keys = ["test"];
app.use(session);

loginRouter.get("/login",(ctx,next)=>{
    const user = {
        id: 1,
        name: 'root'
    }
    ctx.session.user = user;
    ctx.body = "设置session";
});

const useRouter = new Router();

useRouter.get("/use",(ctx,next)=>{
    const user = ctx.session.user;
    ctx.body = user;
});

app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

app.use(useRouter.routes());
app.use(useRouter.allowedMethods());

app.listen(8990,()=>{
    console.log("开启 8990");
})