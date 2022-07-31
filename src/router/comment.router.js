const Router = require("koa-router");
const { create, reply, update, deleteById, getByMomentId } = require("../controller/comment.controller");
const commentRouter = new Router({prefix: "/comment"});
const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");

commentRouter.post("/",verifyAuth,create);

// 回复
commentRouter.post("/:commentId/reply",verifyAuth,reply);

// 更新
commentRouter.patch("/:commentId",verifyAuth,verifyPermission,update);

// 删除
commentRouter.delete("/:commentId",verifyAuth,verifyPermission,deleteById);

// 获取评论
commentRouter.get("/",getByMomentId);

module.exports = commentRouter;