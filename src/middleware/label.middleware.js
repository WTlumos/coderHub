const { create, getLabelByName } = require("../service/label.service");

const verifyLabelExists = async (ctx,next)=>{
    const userId = ctx.user.id;
    // 取出所有标签
    const{labels} = ctx.request.body;
    // 判断标签是否存在
    const newLabels = [];
    for(let name of labels){
        const labelResult = await getLabelByName(name);
        // console.log(!labelResult);
        const label = {name};
        if(!labelResult){
            const result = await create(name,userId);
            // console.log(result);
            label.id = result.insertId;
        }else{
            label.id = labelResult.id;
        }
        newLabels.push(label);
    }
    ctx.labels = newLabels;
    // console.log(newLabels);
    await next();
}

module.exports = {
    verifyLabelExists
}