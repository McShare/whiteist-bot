const {SCode} = require("./statusCode");
const {getMbid,getMcid} = require('../db');
module.exports = (req,res)=>{
    let url = new URL(req.url, `http://${req.headers.host}`);
    console.log('finding',(url.search));
    let params = url.searchParams;
    let mcid = params.get("mcid")
    let mbid= params.get("mbid");
    if(mbid || mcid){
        if(mbid && mcid){
            let cid = getMcid(decodeURI(mbid)).result;
            res.json({
                code:SCode.OK,
                match:cid == mcid
            });
        }else if(mbid){
            let cid = getMcid(mbid);
            res.json({
                code:SCode.OK,
                data:cid
            });
        }else{
            let id = getMbid(mcid);
            res.json({
                code:SCode.OK,
                data:id
            });
        }
    }else{
        res.json({
            code:SCode.KeyNotFound,
            msg:'缺失 {mbid} 或 {mcid}'
        })
    }
}

