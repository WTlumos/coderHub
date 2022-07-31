const { createAvatar, createFiles } = require("../service/file.service");
const { updateAvatarUrl } = require("../service/user.service");
const { APP_HOST, APP_PORT } = require("../app/config");

class FileController{
    async saveAvatarInfo(ctx,next){
        /**
         * {
                fieldname: 'avatar',
                originalname: 'LanternsLarge.png',
                encoding: '7bit',
                mimetype: 'image/png',
                destination: './upload',
                filename: '1659167959021.png',
                path: 'upload/1659167959021.png',
                size: 13625
            }
         */
        const {mimetype,filename,size} = ctx.request.file;
        // console.log(ctx.request.file);
        const userId = ctx.user.id;
        const result = await createAvatar(mimetype,filename,size,userId);

        // 图片路由放入users表
        const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${userId}/avatar`;
        // console.log(avatarUrl);
        await updateAvatarUrl(avatarUrl,userId);

        ctx.body = result;
    }

    async savePictureInfo(ctx,next){
        const files = ctx.request.files;
        const {momentId} = ctx.query;
        const userId = ctx.user.id;
        // console.log(files);
        for(let file of files){
            const {mimetype,filename,size} = file;
            // console.log(mimetype,filename,size,userId,momentId);
            await createFiles(mimetype,filename,size,userId,momentId);
        }
        ctx.body = "内容配图上传成功";
        
    }
    
   
}

module.exports = new FileController();