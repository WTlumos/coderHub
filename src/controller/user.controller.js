const fs = require("fs");
const { AVATAR_PATH } = require("../constants/filePath");

const { getAvatarById } = require("../service/file.service");
const {create} = require("../service/user.service");

class UserController{
    async create(ctx,next){
        // 获取用户请求传递的参数
        const user = ctx.request.body;
        // console.log(user);
        // 查询数据
        const result = await create(user);
        // console.log(result);
        // 返回数据
        ctx.response.body = result;
    };

    async getAvatarInfo(ctx,next){
        const {userId} = ctx.params;
        // console.log(userId);
        const result = await getAvatarById(userId);
        // console.log(result);
        ctx.response.set("content-type",result.mimetype);
        // console.log(AVATAR_PATH+result.filename);
        ctx.body = fs.createReadStream(AVATAR_PATH+result.filename);
        
    }
}

module.exports = new UserController();