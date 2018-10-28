const express=require('express');
const app=express();
const auth=require('./wechat/auth');
//引入sha1模块
//const sha1=require('sha1');
//const config=require('./config');
//ngrok 内网穿透
//token 参与签名加密的参数
//卡发这服务器要验证消息是否来源服务器
//接受所有消息
//开发者服务器验证消息是不是来自于微信
//计算微信加密签名signature和微信发送过来的signature是不是一样如果不一样说明不是
//讲参与微信加密前面的三个参数
//1timetamp，
//定义配置对象
/*const config={
  token:'pyf123456',
  appID:'wx3afe24e406b3e960',
  appsecret:'b386cc5c91fe2188a6daf8e609b1c6cc'
}*/
//配置模板资源目录

app.set('views','./views');
//配置模板引擎
//pezhi luyou
app.set('view engine','ejs');
//配置路由
app.get('/search',(req,res)=>{
//渲染我们的页面 把渲染好的页面返回个i用户
//生成js-sdk需要的签名
//组合参与签名4个参数
res.render('search');
})










app.use(auth());
//jianting die
/** signature: '8648dae32920fa51bf3fb81d6433a425e06d947c',
  echostr: '1686646651025735627',
  timestamp: '1540460426',
  nonce: '567205707' */
app.listen(3000,()=>console.log('server is success_'))