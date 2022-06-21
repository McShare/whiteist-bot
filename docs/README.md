# web接口

每个接口都会返回`code`表示请求受理情况

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
|::|::|
|mbid|minebbs昵称|
|mcid|minecarft昵称|
