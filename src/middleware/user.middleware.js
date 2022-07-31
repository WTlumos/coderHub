const { REQUIRED, NAME_EXIST } = require("../constants/errorType");
const { getUserByName } = require("../service/user.service");
const md5Password = require("../utils/passwordHandler");

const verifyUser = async (ctx,next)=>{
    // 得到输入的用户名和密码
    const {name,password} = ctx.request.body;
    // 判断是否为 undefined or ''
    if(!name || !password){
        // 返回错误信息
        const error = new Error(REQUIRED);
        return ctx.app.emit("error",error,ctx);
    }
    // 判断用户名是否已经存在于数据库
    const nameExist = await getUserByName(name);
    // console.log(nameExist.length>0);
    if(nameExist.length>0){
         // 返回错误信息
         const error = new Error(NAME_EXIST);
         return ctx.app.emit("error",error,ctx);
    }
    await next();
}

const handlePassword = async (ctx,next)=>{
    let { password } = ctx.request.body;
    ctx.request.body.password = md5Password(password);
    await next();
}

module.exports = {
    verifyUser,
    handlePassword
}