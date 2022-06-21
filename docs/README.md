# web接口

每个接口都会返回`code`表示请求受理情况

|相应|含义|
|:-:|:-:|
|0|OK|
|1|提交数据缺项|
|2|请求路径不存在|
|3|白名单已经存在|
|100|服务器内部错误|

详见：https://github.com/McShare/whiteist-bot/blob/main/src/webapi/statusCode.js

使用`node app`启动服务器之后

*ps:默认端口貌似是3000，以下就用3000举例子*

## 添加白名单

```
[POST] 127.0.0.1:3000/add 
```

添加服务器白名单，请求JSON格式为

``` json
{
  "mbid":"YYT", //Minebbs的昵称
  "mcid":"SuperYYT" //Minecraft中的昵称
}
```

## 查询白名单

```
[GET] 127.0.0.1:3000/query?mbid=xxx&mcid=xxx
```

这个接口有多种参数可选

|参数|含义|
|:-:|:-:|
|mbid|minebbs昵称|
|mcid|minecarft昵称|

举例子
1. /query?mbid=YYT，查询Minebbs昵称为YYT的用户的minecarft昵称
2. /query?mcid=SuperYYT，查询minecarft昵称为SuperYYT的用户的minebbs昵称
3. /query?mcid=SuperYYT&mbid=YYT，查询两个昵称是否互相匹配 

响应格式

eg：http://127.0.0.1:3000/query?mbid=YYT
``` json
{
  "code": 0,
  "data": {
    "find": true,  //找不到为false
    "result": "SuperYYT"
  }
}
```
eg：http://127.0.0.1:3000/query?mbid=YYT&mcid=SuperYYT
``` json
{
  "code": 0,
  "match": true //两个id匹配，不匹配为false
}
```
## 移除白名单

```
[POST] /rem
```

请求格式JSON为

``` json
{
  "mbid":"YYT"
}
```

或者

``` json
{
  "mcid":"SupperYYT"
}
```

如果两个参数同时存在会先判断`mbid`

![](https://s1.ax1x.com/2022/06/21/jSZ5Lj.png)

如果后台有这样的提示代表加、删白名单成功
