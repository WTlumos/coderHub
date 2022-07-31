const { REQUIRED, NAME_NOT_EXISTS, PASSWORD_NOT_SAME, UNAUTHORIZED, UNPERMISSION } = require("../constants/errorType");
const { getUserByName } = require("../service/user.service");
const md5Password = require("../utils/passwordHandler");

const jwt = require("jsonwebtoken");
const { PUBLIC_KEY } = require("../app/config");
const { checkResource } = require("../service/auth.service");

const verifyLogin = async (ctx,next)=>{
    // 1.获取用户名和密码
    const {name,password} = ctx.request.body;

    // 2.判断用户名和密码是否为空
    if(!name||!password){
        const error = new Error(REQUIRED);
        return ctx.app.emit("error",err,ctx);
    }

    // 3.判断用户是否存在
    const result = await getUserByName(name);
    // console.log(result[0]);
    if(result.length == 0){
        const error = new Error(NAME_NOT_EXISTS);
        return ctx.app.emit("error",error,ctx);
    }

    const user = result[0];
    // 4.判断密码是否和数据库中的密码一致
    if(md5Password(password) != user.password){
        const error = new Error(PASSWORD_NOT_SAME);
        return ctx.app.emit("error",error,ctx);
    }

    ctx.user = user;
    await next();
}

const verifyAuth = async (ctx,next)=>{
    try {
        const authorization = ctx.headers.authorization;
        const token = authorization.replace("Bearer ","");
        const user = jwt.verify(token,PUBLIC_KEY,{
            algorithms: ['RS256']
        });
        ctx.user = user;
        await next();
    } catch (error) {
        const err = new Error(UNAUTHORIZED);
        return ctx.app.emit("error",err,ctx);
    }
}

const verifyPermission = async (ctx,next)=>{
    try{
        const [key] = Object.keys(ctx.params);
        const tableName = key.replace("Id","s");
        const id = ctx.params[key];
        const userId = ctx.user.id;
        // console.log(tableName,id,userId);
        const result = await checkResource(tableName,id,userId);
        // console.log(result);
        if(result){
            await next();
        }else{
            throw new Error();
        }
    }catch(err){
        const error = new Error(UNPERMISSION);
        return ctx.app.emit("error",error,ctx);
    }
        
}

module.exports = {
    verifyLogin,
    verifyAuth,
    verifyPermission
}