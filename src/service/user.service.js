const mysql = require("../app/database");

class UserService{
    // 注册用户
    async create(user){
        // 解构
        const {name,password} = user;
        // 将user存储到数据库中
        const statement = 'insert into users (name,password) values (?,?)';
        const result = await mysql.execute(statement,[name,password]);
        
        // 返回结果
        return result;
    }
    // 查找用户名是否存在
    async getUserByName(name){
         // 将user存储到数据库中
         const statement = 'select * from users where name = ?';
         const result = await mysql.execute(statement,[name]);
        //  console.log(result[0]);
         // 返回结果
         return result[0];
    }

    async updateAvatarUrl(avatarUrl,userId){
        // console.log(avatarUrl,userId);
        const statement = `update users set avatar_url = ? where id = ?`;
        const [result] = await mysql.execute(statement,[avatarUrl,userId]);
        // console.log(result);
        return result;
    }

    async getUserById(userId){
        const statement = `select * from users where id = ?`;
        const [result] = await mysql.execute(statement,[userId]);
        // console.log(result);
        return result[0];
    }
}

module.exports = new UserService();
