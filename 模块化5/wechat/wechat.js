//获取accessToken
//调用接口的唯一凭据
//唯一性 只是有两个小时
//提前5分钟 
//借口权限每天2000次
const {writeFile,readFile}=require('fs');
const {appID,appsecret}=require('../config');
const menu=require('./menu');
const api=require('../utils/api');
const{writeFileAsync,readFileAsync}=require('../utils/tool');
//引入config模块
//console.log(appID);
//console.log(appsecret);
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
       /* accessToken=JSON.stringify(accessToken);
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
       })*/
      return writeFileAsync(accessToken,'access_token.txt');
        
    }
    readAccessToken(){
        //accessToken=JSON.stringify(accessToken);
        //accessToken是一个object对象鼻血把他转换成字符串再写入
      /* return new Promise((resolve,reject)=>{
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
       })*/
       return readFileAsync('access_token.txt');
        
    }
    isValidAccessToken(data){
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
    fetcgAccessToken(){
       //return new Promise((resolve,reject)=>{
           if(this.access_token&&this.expires_in&&this.isValidAccessToken(this)){
            //说明之前保存过这个token并且这个token是有效的直接可以使用
            return Promise.resolve({
                access_token:this.access_token,
                expires_in:this.expires_in
            })
           }
        return this.readAccessToken()
        .then(async res=>{
            //说明本地是有文件的
            if(this.isValidAccessToken(res)){
                return Promise.resolve(res);
                //resolve(res);
                //有效
            }else{
                
            const res=await this.getAccessToken();
                
                   await this.saveAccessToken(res)
                   return Promise.resolve(res);
                        //resolve(res);
                    
            }
            }
        )
        .catch(async err=>{
            //说明本地是没有文件的  
            const res=await  this.getAccessToken();
                
            await this.saveAccessToken(res)
             return Promise.resolve(res);
                 //resolve(res);
            //.catch()
        }).then(res=>{
            //讲access——token挂载到this上面
            this.access_token=res.access_token;
            this.expires_in=res.expires_in;
            //是this.readaccesstoken返回值 
            return Promise.resolve(res);
        })
        }
    //)}
    //用来穿件自定义菜单


//jspai_ticket获取









    getTicket(){
      //  const url='https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid='+appID+'&secret='+appsecret;
    //定义请求地址  https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
    //发送请求
       

        return new Promise(async(resolve,reject)=>{
            const data=await this.fetcgAccessToken();
            
            const url=api.ticket+'&access_token='+data.access_token;
            rp({method:'GET',url,json:true})
            .then(res=>{
                //console.log(res);  
                res.expires_in=Date.now()+(res.expires_in-300)*1000;
               resolve({ticket:res.ticket,expires_in:Date.now()+(res.expires_in-300)*1000});
            })
            .catch(err=>{
                console.log(err);
                reject('getAccessToken方法除了问题'+err);
            })
        })
    
    //返回值是一个promis对象
    }
    //save accesstoken
    //保存ticket票据
    saveTicket(ticket){
      /*  ticket=JSON.stringify(ticket);
        //accessToken是一个object对象鼻血把他转换成字符串再写入
       return new Promise((resolve,reject)=>{
        writeFile('./ticket.txt',ticket,err=>{
            if(!err){
                console.log("文件保存成功");
                resolve();
            }else{
                reject('saveTicket方法除了问题'+err);
            }
        })
       })*/
       return writeFileAsync(ticket,'ticket.txt');
        

    }
    readTicket(){
        //accessToken=JSON.stringify(accessToken);
        //accessToken是一个object对象鼻血把他转换成字符串再写入
     /*  return new Promise((resolve,reject)=>{
        readFile('./ticket.txt',(err,data)=>{
            if(!err){
                console.log("文件读取成功");
                //data是一字符串
                data=JSON.parse(data);
                resolve(data);
            }else{
                reject('readticket方法除了问题'+err);
            }
        })
       })*/
       return readFileAsync('ticket.txt');
        
    }
    isValidTicket(data){
        //判断accesstoken师傅下载
        //传入参数师傅偶又想
        //是否有获取时间是否哟token 如果不的话就无效     
        if(!data&&!data.ticket&&!data.expires_in){
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
    fetchTicket(){
       //return new Promise((resolve,reject)=>{
           if(this.ticket&&this.ticket_expires_in&&this.isValidTicket(this)){
            //说明之前保存过这个token并且这个token是有效的直接可以使用
            return Promise.resolve({
                ticket:this.ticket,
                expires_in:this.expires_in
            })
           }
        return this.readTicket()
        .then(async res=>{
            //说明本地是有文件的
            if(this.isValidTicket(res)){
                return Promise.resolve(res);
                //resolve(res);
                //有效
            }else{
                
            const res=await this.getTicket();
                
                   await this.saveTicket(res)
                   return Promise.resolve(res);
                        //resolve(res);
                    
            }
            }
        )
        .catch(async err=>{
            //说明本地是没有文件的  
            const res=await  this.getTicket();
                
            await this.saveTicket(res)
             return Promise.resolve(res);
                 //resolve(res);
            //.catch()
        }).then(res=>{
            //讲access——token挂载到this上面
            this.ticket=res.ticket;
            this.ticket_expires_in=res.expires_in;
            //是this.readaccesstoken返回值 
            return Promise.resolve(res);
        })
        }
    //)}



















    createMenu(menu){
        return new Promise(async(resolve,reject)=>{
          try{
            const data=await this.fetcgAccessToken();
            const url=' https://api.weixin.qq.com/cgi-bin/menu/create?access_token='+data.access_token;
            //发送请求
      const result= await  rp({method:'POST',url,json:true,body:menu});
      resolve(result);
          }catch(e){
              console.log("i am here");
              reject('createNenu除了问题'+e);
          }
        })
    }
    //用来删除自定义菜单
    deleteMenu(){
        return new Promise(async(resolve ,reject)=>{
            try{
                const data=await this.fetcgAccessToken();
           const url='https://api.weixin.qq.com/cgi-bin/menu/delete?access_token='+data.access_token;
      const result=await  rp({method:'GET',url,json:true});
        resolve(result);
            }catch(e){
                console.log(" i am not herer")
                reject(e+'deleteMenu方法出现异常');
                
            }
        })
    }
}
//本地模拟一下
/*
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
})*/

(async()=>{
//删除之前定义的菜单
const w=new Wechat();
/*let result =await w.deleteMenu();
console.log(result);
result=await w.createMenu(menu);
console.log(result);*/
const data=await w.fetchTicket(); 
console.log(data)
console.log("why can you tell me ");
console.log("成也异步败也异步");
})()
/*const w=new Wechat();
w.createMenu(menu);*/