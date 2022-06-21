# web接口

使用`node app`启动服务器之后

*ps:默认端口貌似是3000，以下就用3000举例子*

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
