const sha1=require('sha1');
const config=require('../config');
//引入模块
//引入模块
const template=require('./template');
const reply=require('./reply');
const {getUserDataAsync,parseXMLAsync,formatMessage}=require('../utils/tool');
module.exports=()=>{
    return  (async(req,res,next)=>{
        //console.log(req.query);
        /*signature: '40f7a7c12401f2b0fb78372b7ebdb7239baa5d16',微信的加密签名
          echostr: '4638025576925462399',微信随机字符串
          timestamp: '1540453223',微信发送请求的时间戳
          nonce: '623432114'  微信的随机数字*/
          const{signature,echostr,timestamp,nonce}=req.query;
          const {token}=config;
          //console.log("why not have token?");
          //console.log(token);
          const sha1Str=sha1([timestamp,nonce,token].sort().join('')); 
          //进行判断
          
          if(req.method=='GET'){
            if(sha1Str==signature){
              res.send(echostr);
              console.log("i am here");
            }else{
              res.end('error');
            }


          }else if(req.method=='POST'){
            //console.log("alread jie shoudao post 请求")
            if(sha1Str!==signature){
              res.end('error');
            }
            //console.log(req.query);
            //接受请求体数据
            //流失数据
            const xmlData=await getUserDataAsync(req);
            //console.log(xmlData);
            //将xml解析成js对象
            const jsData=await parseXMLAsync(xmlData);
            console.log(jsData);  
            const message=formatMessage(jsData);
            console.log(message);
            //判断用户消息是否是文本消息
         









           
            const options=reply(message);
          
            const replyMessage=template(options);
            console.log(replyMessage);
            console.log(replyMessage);
            res.send(replyMessage);
            //但会响应给微信服务器
            //res.end('');
          }else{
            console.log("i am here")
            res.end('error');
          }




        })
}