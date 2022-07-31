const path = require("path");
const Multer = require("@koa/multer");
const Jimp = require("jimp");

const {AVATAR_PATH,PICTURE_PATH} = require("../constants/filePath");

const avatar = Multer({
    dest: AVATAR_PATH
});
const avatarHandler = avatar.single("avatar");


const picture = Multer({
    dest: PICTURE_PATH
});
const pictureHandler = picture.array("picture",9);

const pictureResize = async (ctx,next)=>{
    const files = ctx.request.files;

    for(let file of files){
        const filePath = path.join(file.destination,file.filename);
        Jimp.read(file.path).then(image=>{
            image.resize(1280,Jimp.AUTO).write(`${filePath}-large`);
            image.resize(640,Jimp.AUTO).write(`${filePath}-middle`);
            image.resize(320,Jimp.AUTO).write(`${filePath}-small`);
        })
    }
    await next();
}


module.exports = {
    avatarHandler,
    pictureHandler,
    pictureResize
};