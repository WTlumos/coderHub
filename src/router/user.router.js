const Router = require("koa-router");
const useRouter = new Router({prefix: "/user"});

const { create, getAvatarInfo } = require("../controller/user.controller");
// 判断 空值，已存在 中间件
const { verifyUser, handlePassword } = require("../middleware/user.middleware");

// 注册
useRouter.post("/",verifyUser,handlePassword,create);

// 获取头像
useRouter.get("/:userId/avatar",getAvatarInfo);

module.exports = useRouter;