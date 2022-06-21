const {SCode} = require("./statusCode");
const {getMbid,getMcid,add} = require('../db');
const server = require('../mcserver');
module.exports = (req,res)=>{
    let data = req.body;
    console.log(data);
    if(data.mbid && data.mcid){
        let has_mb = getMbid(data.mbid);
        let has_mc = getMcid(data.mcid);
        if(!has_mb.find && !has_mc.find){
            add(data.mbid,data.mcid);
            server.send(`whitelist add ${data.mcid}`);
            res.json({
                code:SCode.OK
            });
        }else{
            res.json({
                code:SCode.AlreadyHas,
                msg:'用户已经存在',
                mb:has_mb.find,
                mc:has_mc.find
            })
        }
    }else{
        res.json({
            code:SCode.KeyNotFound,
            msg:'缺失 {mbid} 或 {mcid}'
        })
    }
}