const {SCode} = require("./statusCode");
const {getMbid,getMcid,add,rem} = require('../db');
const server = require('../mcserver');
module.exports = (req,res)=>{
    let data = req.body;
    if(data.mbid || data.mcid){
        if(data.mbid){
            let mcid = getMcid(data.mbid).result;
            rem(mcid);
            server.send(`whitelist remove ${mcid}`);
        }else{
            rem(data.mcid);
            server.send(`whitelist remove ${data.mcid}`);
        }
        res.json({
            code:SCode.OK
        })
    }else{
        res.json({
            code:SCode.KeyNotFound,
            msg:'缺失 {mbid} 或 {mcid}'
        })
    }
}