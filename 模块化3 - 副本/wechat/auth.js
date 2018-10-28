
const sha1=require('sha1');
const config=require('../config');
module.exports=()=>{
    return ((req,res,next)=>{
        //console.log(req.query);
        /*signature: '40f7a7c12401f2b0fb78372b7ebdb7239baa5d16',微信的加密签名
          echostr: '4638025576925462399',微信随机字符串
          timestamp: '1540453223',微信发送请求的时间戳
          nonce: '623432114'  微信的随机数字*/
          const{signature,echostr,timestamp,nonce}=req.query;
          const token=config;
          //进行sha1加密
          const arr=[timestamp,nonce,token];
          const arrSort=arr.sort();
          console.log(arrSort);
          const str=arr.join('');
          console.log(str);
          const sha1Str=sha1(str);
          console.log(sha1Str);
          //进行判断
          if(sha1Str==signature){
            res.send(echostr);
          }else{
            res.end('error');
          }
        })
}