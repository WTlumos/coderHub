const koa = require("koa");
const app = new koa();

const Router = require("koa-router");
const loginRouter = new Router();

const jwt = require("jsonwebtoken");

const fs = require("fs");
const path = require("path");
const privateKey = fs.readFileSync(path.resolve(__dirname,"private.key"));
const publicKey = fs.readFileSync(path.resolve(__dirname,"public.key"));

loginRouter.get("/login",(ctx,next)=>{
    const user = {
        id: 1,
        name: 'root'
    }
    const token = jwt.sign(user,privateKey,{
        // expressed in seconds
        expiresIn: 60,
        algorithm: 'RS256'
    })
    ctx.body = "设置token "+token;
});

const useRouter = new Router();

useRouter.get("/use",(ctx,next)=>{
    try{
        const authorization = ctx.headers.authorization;
        const token = authorization.replace("Bearer ","");
        const user = jwt.verify(token,publicKey,{
            algorithms: ['RS256']
        });
        ctx.body = user;
    }
    catch(err){
        return ctx.app.emit("error",err,ctx);
    }
});

app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

app.use(useRouter.routes());
app.use(useRouter.allowedMethods());

app.on("error",(error,ctx)=>{
    ctx.body = error.message;
})

app.listen(8990,()=>{
    console.log("开启 8990");
});