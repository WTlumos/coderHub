const mysql = require("../app/database");

class CommentService{
    async create(userId,momentId,content){
        // console.log(userId,momentId,content);

        const statement = `insert into comments (moment_id, user_id,content) values (?,?,?)`;
        const [result] = await mysql.execute(statement,[momentId,userId,content]);
        // console.log(result);
        return result;
    }

    async reply(userId,momentId,commentId,content){
        const statement = `insert into comments (comment_id,moment_id, user_id,content) values (?,?,?,?)`;
        const [result] = await mysql.execute(statement,[commentId,momentId,userId,content]);
        // console.log(result);
        return result;
    }

    async update(commentId,userId,content){
        // console.log(content,commentId,userId);
        const statement = `update comments set content = ? where id = ? and user_id = ?`;
        const [result] = await mysql.execute(statement,[content,commentId,userId]);
        // console.log(result);
        return result;
    }

    async deleteById(commentId,userId){
        // console.log(commentId,userId);
        const statement = `delete from comments where id = ? and user_id = ?`;
        const [result] = await mysql.execute(statement,[commentId,userId]);
        // console.log(result);
        return result;
    }

    async getByMomentId(momentId){
        const statement = `
            select 
                c.id id,c.content content,c.comment_id commentId,c.createAt createAt,c.updateAt updateAt,
                json_object("id",u.id,"name",u.name) user
            from comments c
            left join users u on	
                c.user_id = u.id
            where c.moment_id = ?
        `;
        const [result] = await mysql.execute(statement,[momentId]);
        return result;
    }
}

module.exports = new CommentService();