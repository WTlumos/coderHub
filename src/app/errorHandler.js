const { REQUIRED, NAME_EXIST, NAME_NOT_EXISTS, PASSWORD_NOT_SAME, UNAUTHORIZED, UNPERMISSION } = require("../constants/errorType");

const errorHandler = (error,ctx)=>{
    // console.log(error.message);
    let status,message;
    switch (error.message){
        case REQUIRED: 
            // Bad Request
            status = 400; 
            message = '值不能为空';
            break;
        case NAME_EXIST:
            // conflict
            status = 409;
            message = '该用户名已存在';
            break;
        case NAME_NOT_EXISTS:
            // Bad Request
            status = 400;
            message = '该用户名不存在';
            break;
        case PASSWORD_NOT_SAME:
            // Bad Request
            status = 400;
            message = '密码不正确';
            break;
        case UNAUTHORIZED:
            // unauthorized
            status = 401;
            message = 'token无效';
            break;
        case UNPERMISSION:
            // Forbidden
            status = 403;
            message = '用户没有操作权限';
            break;
        default: 
            status = 404;
            message = 'NOT FOUND';

    }

    ctx.status = status;
    ctx.body = message;
}

module.exports = errorHandler;