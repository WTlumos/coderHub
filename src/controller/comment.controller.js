const { create, reply, update, deleteById, getByMomentId } = require("../service/comment.service");

class CommentController{
    async create(ctx,next){
        const {momentId,content} = ctx.request.body;
        const userId = ctx.user.id;

        const result = await create(userId,momentId,content);
        ctx.body = result;
    }

    async reply(ctx,next){
        const userId = ctx.user.id;
        const commentId = ctx.params.commentId;
        const {momentId,content} = ctx.request.body;

        const result = await reply(userId,momentId,commentId,content);
        ctx.body = result;
    }

    async update(ctx,next){
        const commentId = ctx.params.commentId;
        const content = ctx.request.body.content;
        const userId = ctx.user.id;
        const result = await update(commentId,userId,content);
        ctx.body = result;
    }

    async deleteById(ctx,next){
        const commentId = ctx.params.commentId;
        const userId = ctx.user.id;
        // console.log(commentId,userId);
        const result = await deleteById(commentId,userId);
        ctx.body = result;
    }

    async getByMomentId(ctx,next){
        const momentId = ctx.query.momentId;

        const result = await getByMomentId(momentId);

        ctx.body = result;
    }
}

module.exports = new CommentController();