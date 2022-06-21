const rcon = require('../node-rcon');
var log4js = require("log4js");
const fs = require("fs");
class Server{
    rcon;
    host;
    port;
    passwd;
    logger;
    constructor(host,port,pwd){
        this.logger = log4js.getLogger();
        this.logger.level = 'debug'
        this.rcon = new rcon();
        this.port = port;
        this.host = host;
        this.passwd = pwd;
        this.logger.info(`准备连接：${host}`);
        this.connect();
        setInterval(()=>{
            this.#protect()
        }, 5e3);
    }
    connect(){
        this.rcon.connect(this.host,this.port,this.passwd).then(()=>{
            this.logger.info('服务器已连接');
        }).catch((err)=>{
            this.logger.warn("服务器连接失败！！");
            this.logger.error(err);
        });
    }
    async send(cmd){
        try {
            this.logger.info('发送：'+cmd);
            return await this.rcon.send(cmd);
        } catch (message) {
            return console.log(message);
        }
    }
    #protect(){
        if(this.rcon.online == false){
            this.logger.error('warning!');
            this.connect();
        }
    }
}

let config = require('../../config.json');

module.exports = new Server(config.server.host,config.server.port,config.server.password);