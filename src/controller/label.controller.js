const { create, list, update, deleteById } = require("../service/label.service");

class LabelController{
    async create(ctx,next){
        const {name} = ctx.request.body;
        const userId = ctx.user.id;
        const result = await create(name,userId);
        ctx.body = result;
    }

    async list(ctx,next){
        const {offset,size} = ctx.query;
        // console.log(ctx.query);
        const result = await list(offset,size);
        ctx.body = result;
    }

    async update(ctx,next){
        const labelId = ctx.params.labelId;
        const name = ctx.request.body.name;
        const userId = ctx.user.id;
        const result = await update(name,labelId,userId);
        ctx.body = result;
    }

    async deleteById(ctx,next){
        const labelId = ctx.params.labelId;
        const userId = ctx.user.id;
        const result = await deleteById(labelId,userId);
        ctx.body = result;
    }
}

module.exports = new LabelController();