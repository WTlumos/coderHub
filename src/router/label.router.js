const Router = require("koa-router");

const labelRouter = new Router({prefix:"/label"});

const { create, list, update, deleteById } = require("../controller/label.controller");
const {verifyAuth, verifyPermission} = require("../middleware/auth.middleware");

labelRouter.post("/",verifyAuth,create);

labelRouter.get("/",list);

labelRouter.patch("/:labelId",verifyAuth, verifyPermission ,update);

labelRouter.delete("/:labelId",verifyAuth, verifyPermission ,deleteById);

module.exports = labelRouter;