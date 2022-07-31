const mysql = require("../app/database");

class AuthService{
    async checkResource(tableName,id,userId){
        // console.log(tableName,id,userId);
        const statement = `select * from ${tableName} where id = ? and user_id = ?`;
        const [result] = await mysql.execute(statement,[id,userId]);
        // console.log(result);
        if(result.length == 0){
            return false;
        }
        return true;
    }
}

module.exports = new AuthService();