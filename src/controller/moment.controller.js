const fs = require("fs");
const { PICTURE_PATH } = require("../constants/filePath");

const { getFileByName } = require("../service/file.service");
const { hasLabel, createMomentLabel } = require("../service/label.service");
const { create, getMomentById, getMomentList, update, deleteById } = require("../service/moment.service");

class MomentController{
    async create(ctx,next){
        const {id} = ctx.user;
        const content = ctx.request.body.content;
        const result = await create({id,content});

        ctx.body = result;
    }

    async getById(ctx,next){
        const id = ctx.params.momentId;
        
        const result = await getMomentById(id);

        ctx.body = result;
    }

    async list(ctx,next){
        const {offset,size} = ctx.query;
        // console.log(ctx.query);
        const result = await getMomentList(offset,size);
        ctx.body = result;
    }

    async update(ctx,next){
        const id = ctx.params.momentId;
        const content = ctx.request.body.content;
        const userId = ctx.user.id;
        const result = await update(id,content,userId);
        ctx.body = result;
    }

    async deleteById(ctx,next){
        const id = ctx.params.momentId;
        const userId = ctx.user.id;
        const result = await deleteById(id,userId);
        ctx.body = result;
    }   

    async addLabels(ctx,next){
        // 获取标签和动态id
        const labels = ctx.labels;
        const momentId = ctx.params.momentId;

        // 添加所有标签
        for(let label of labels){
            // 判断标签是否已经关联内容
            const exist = await hasLabel(momentId,label.id);
            if(!exist){
                const result = await createMomentLabel(momentId,label.id);
            }
        }
        ctx.body = "内容添加标签";
    }

    async fileInfo(ctx,next){
        const {filename} = ctx.params;
        const {type} = ctx.query;
        const result = await getFileByName(filename);
        ctx.response.set("content-type",result.mimetype);
        let path = PICTURE_PATH;
        
        if(!type){
            path += result.filename;
        }else{
            path += result.filename+ "-"+type;
        }
        // console.log(path);
        ctx.body = fs.createReadStream(path);
    }
}

module.exports = new MomentController();