// 环境变量
const {APP_PORT} = require("./app/config");

// app处理模块
const app = require("./app");

// 导入数据库连接
require("./app/database");



app.listen(APP_PORT,()=>{
    console.log(`开启 ${APP_PORT} 端口`);
})