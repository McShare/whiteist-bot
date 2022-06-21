const sqlite = require('better-sqlite3');
const db = sqlite('data.sqlite')//,{verbose:console.log});
const fs = require('fs');

let q = db.exec(`CREATE TABLE IF NOT EXISTS MBID(
    ID INTEGER PRIMARY KEY AUTOINCREMENT,
    NAME           TEXT    NOT NULL,
    MBNAME TEXT NOT NULL);`);

function add(mbid,mcid){
    let r = db.prepare(`INSERT INTO MBID VALUES (NULL,@mcid,@mbid);`).run({mbid,mcid});
    return r.changes;
}

function getMbid(mcid){
    let rt = {find:false,result:""}
    let r = db.prepare(`SELECT * FROM MBID WHERE NAME = '${mcid}';`).all();
    if(r.length >0){
        rt.find = true;
        rt.result = r[0].MBNAME
    }
    return rt;
}

function getMcid(mbid){
    let rt = {find:false,result:""}
    let r = db.prepare(`SELECT * FROM MBID WHERE MBNAME = '${mbid}';`).all();
    if(r.length >0){
        rt.find = true;
        rt.result = r[0].NAME
    }
    return rt;
}

function match(mbid,mcid){
    let r = db.prepare(`SELECT * FROM MBID WHERE MBNAME = '${mbid}' AND NAME = '${mcid}';`).all();
    return r.length > 0;
}

function rem(id){
    let r = db.prepare(`DELETE FROM MBID WHERE NAME = @id OR MBNAME = @id;`).run({id});
    return r.changes;
}

module.exports = {
    add,
    getMbid,
    getMcid,
    match,
    rem
};