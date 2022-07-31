const mysql = require("mysql2");
const config = require("./config");

const connection = mysql.createPool({
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    user: config.DATABASE_USER,
    password: config.DATABASE_PASSWORD,
    database: config.DATABASE,
    connectionLimit: 10
});

connection.getConnection((err,con)=>{
    if(err){
        console.log("数据库连接失败: "+err);
    }else{
        console.log("数据库连接成功");
    }
    
})

module.exports = connection.promise();