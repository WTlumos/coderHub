const mysql = require("../app/database");
class FileService{

    async createAvatar(mimetype,filename,size,userId){
        const statement = `insert into avatars (mimetype,filename,size,user_id) values (?,?,?,?)`;
        const [result] = await mysql.execute(statement,[mimetype,filename,size,userId]);
        return result;
    }

    async getAvatarById(userId){
        const statement = `select * from avatars where user_id = ?`;
        const [result] = await mysql.execute(statement,[userId]);
        return result[0];
    }

    async createFiles(mimetype,filename,size,userId,momentId){
        const statement = `insert into files (mimetype,filename,size,user_id,moment_id) values (?,?,?,?,?)`;
        const [result] = await mysql.execute(statement,[mimetype,filename,size,userId,momentId]);
        return result;
    }

    async getFileByName(name){
        const statement = `select * from files where filename = ?`;
        const [result] = await mysql.execute(statement,[name]);
        return result[0];
    }
}

module.exports = new FileService();