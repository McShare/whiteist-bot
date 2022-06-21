const express = require("express");
const bodyParser = require('body-parser');
const log4js = require("log4js");
const logger = log4js.getLogger('MAIN');
logger.level = 'debug';

const app = express()

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config = require("./config.json");

// 解析 application/json
app.use(bodyParser.json());
// 解析 application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded());

var allowCrossDomain = function (req, res, next) {
    // 所有的接口都可以访问
    res.header('Access-Control-Allow-Origin', '*');//自定义中间件，设置跨域需要的响应头。
    res.header('Access-Control-Allow-Headers', '*');//自定义中间件，设置跨域需要的响应头。
    next();
}

app.use(allowCrossDomain); // 使中间件生效

const add = require('./src/webapi/add');
const query = require("./src/webapi/query");
const rem = require('./src/webapi/rem');

app.get('/query',query);
app.post('/rem',rem);
app.post('/add',add);

app.listen(config.port,()=>{
    logger.info('app listening on',config.port)
})