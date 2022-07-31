const Router = require("koa-router");

const momentRouter = new Router({prefix:"/moment"});

const { verifyAuth, verifyPermission } = require("../middleware/auth.middleware");
const { create, getById, list, update, deleteById, addLabels, fileInfo  } = require("../controller/moment.controller");
const { verifyLabelExists } = require("../middleware/label.middleware");

momentRouter.post("/upload",verifyAuth,create);

momentRouter.get("/get/:momentId",getById);

momentRouter.get("/list",list);

// 更新
momentRouter.patch("/update/:momentId",verifyAuth,verifyPermission,update);

// 删除
momentRouter.delete("/delete/:momentId",verifyAuth,verifyPermission,deleteById);

// 内容添加标签
momentRouter.post("/:momentId/labels",verifyAuth,verifyPermission,verifyLabelExists,addLabels);

// 内容配置
momentRouter.get("/images/:filename",fileInfo);

module.exports = momentRouter;