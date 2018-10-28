//获取accessToken
//调用接口的唯一凭据
//唯一性 只是有两个小时
//提前5分钟 
//借口权限每天2000次
const {writeFile,readFile}=require('fs');
const {appID,appsecret}=require('../config');
//引入config模块
console.log(appID);
console.log(appsecret);
const rp=require('request-promise-native');
class Wechat{
    constructor(){

    }
    getAccessToken(){
        const url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appID+'&secret='+appsecret;
    //定义请求地址  https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    //发送请求
       

        return new Promise((resolve,reject)=>{
            rp({method:'GET',url,json:true})
            .then(res=>{
                console.log(res);  
                res.expires_in=Date.now()+(res.expires_in-300)*1000;
               resolve(res);
            })
            .catch(err=>{
                console.log(err);
                reject('getAccessToken方法除了问题'+err);
            })
        })
    
    //返回值是一个promis对象
    }
    //save accesstoken
    saveAccessToken(accessToken){
        accessToken=JSON.stringify(accessToken);
        //accessToken是一个object对象鼻血把他转换成字符串再写入
       return new Promise((resolve,reject)=>{
        writeFile('./accessToken.txt',accessToken,err=>{
            if(!err){
                console.log("文件保存成功");
                resolve();
            }else{
                reject('saveAccessToken方法除了问题'+err);
            }
        })
       })
        
    }
    readAccessToken(){
        //accessToken=JSON.stringify(accessToken);
        //accessToken是一个object对象鼻血把他转换成字符串再写入
       return new Promise((resolve,reject)=>{
        readFile('./accessToken.txt',(err,data)=>{
            if(!err){
                console.log("文件读取成功");
                //data是一字符串
                data=JSON.parse(data);
                resolve(data);
            }else{
                reject('readAccessToken方法除了问题'+err);
            }
        })
       })
        
    }
    isValidAccessToken(accessToken){
        //判断accesstoken师傅下载
        //传入参数师傅偶又想
        //是否有获取时间是否哟token 如果不的话就无效     
        if(!data&&!data.accessToken&&!data.expires_in){
            return false;
        }
        //判断token是否在有效期之内
        /*if(data.expires_in<Date.now()){
            //代表国企了
            return false;
        }else{
            //没有国企
            return true;
        }*/
        return data.expires_in>Date.now();
    }
}
//本地模拟一下
new Promise((resolve,reject)=>{
    const w=new Wechat();
w.readAccessToken()
.then(res=>{
    //说明本地是有文件的
    if(w.isValidAccessToken(res)){
        resolve(res);
        //有效
    }else{
        w.getAccessToken()
        .then(res=>{
            w.saveAccessToken(res)
            .then(()=>{
                resolve(res);
            })
        })
    }
})
.catch(err=>{
    //说明本地是没有文件的  
    w.getAccessToken()
    .then(res=>{
        w.saveAccessToken(res)
        .then(()=>{
            resolve(res);
        })
    })
    //.catch()
})
}).then(res=>{
    console.log(res);
})