const mysql = require("../app/database");
const {APP_HOST,APP_PORT} = require("../app/config");

const sql = `${APP_HOST}:${APP_PORT}/moment/images/`;

const mysqlFragment = `
    select 
        m.id id, m.content content,m.createAt createAt,m.updateAt updateAt,
        json_object("id",u.id,"name",u.name,"avatarUrl",u.avatar_url) author,
        (select count(*) from comments c where c.moment_id = m.id) commentCount,
        (select count(*) from moment_label ml where ml.moment_id = m.id) labelCount,
        (select 
            if(count(c.id),
                json_arrayagg(
                    json_object("id",c.id,"content",c.content,"commentId",c.comment_id,"createAt",m.createAt,"updateAt",m.updateAt,
                                            "user",json_object("id",us.id,"name",us.name,"avatarUrl",us.avatar_url)
                    )
                ),null) 
            from comments c 
                left join users us on
                us.id = c.user_id 
                where c.moment_id = m.id
        )comments,
        if(count(l.id),json_arrayagg(
            json_object("id",l.id,"name",l.name)
        ) ,null) labels,
        (select 
                json_arrayagg(concat("${sql}",f.filename))
        from files f where f.moment_id = m.id	
        ) images
    from moments m
    left join users u on
            u.id = m.user_id
    left join moment_label ml on
            ml.moment_id = m.id
    left join labels l on
            l.id = ml.label_id					
    group by m.id
`;

class MomentService{
    async create(user){
        // console.log(user);
        const statement = "insert into moments (content,user_id) values (?,?)";
        const [result] = await mysql.execute(statement,[user.content,user.id]);
        // console.log(result);
        return result;
    }

    async getMomentById(id){
        
        const statement = `${mysqlFragment} having m.id = ?`;
        const [result] = await mysql.execute(statement,[id]);
        // console.log(result);
        return result[0];
    }

    async getMomentList(offest,size){
        
        const statement = `${mysqlFragment} limit ?,?`;
        // console.log(statement);
        const [result] = await mysql.execute(statement,[offest,size]);
        // console.log(result);
        return result;
    }

    async update(id,content,userId){
        // console.log(id,content,userId);
        const statement = `update moments set content = ? where id = ? and user_id = ?`;
        const [result] = await mysql.execute(statement,[content,id,userId]);
        return result;
    }

    async deleteById(id,userId){
        const statement = `delete from moments where id = ? and user_id = ?`;
        const [result] = await mysql.execute(statement,[id,userId]);
        return result;
    }
}

module.exports = new MomentService();