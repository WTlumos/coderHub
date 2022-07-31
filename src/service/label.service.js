const mysql = require("../app/database");

class LabelService{
    async create(name,userId){
        const statement = `insert into labels (name,user_id) values (?,?)`;
        const [result] = await mysql.execute(statement,[name,userId]);
        return result;
    }

    async getLabelByName(name){
        const statement = `select * from labels where name = ?`;
        const [result] = await mysql.execute(statement,[name]);
        return result[0];
    }

    async hasLabel(momentId,labelId){
        const statement = `select * from moment_label where moment_id = ? and label_id = ?`;
        const [result] = await mysql.execute(statement,[momentId,labelId]);
        return result[0] ? true: false;
    }

    async createMomentLabel(momentId,labelId){
        const statement = `insert into moment_label (moment_id,label_id) values (?,?)`;
        const [result] = await mysql.execute(statement,[momentId,labelId]);
        return result;
    }

    async list(offset,size){
        const statement = `select * from labels limit ?,?`;
        const [result] = await mysql.execute(statement,[offset,size]);
        return result;
    }

    async update(name,labelId,userId){
        // console.log(name,labelId);
        const statement = `update labels set name = ? where id = ? and user_id = ?`;
        const [result] = await mysql.execute(statement,[name,labelId,userId]);
        return result;
    }

    async deleteById(labelId,userId){
        // console.log(labelId,userId);
        const statement = `delete from labels where id = ? and user_id = ?`;
        const [result] = await mysql.execute(statement,[labelId,userId]);
        return result;
    }
    
}

module.exports=new LabelService();