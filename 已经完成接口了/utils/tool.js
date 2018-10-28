//工具函数
const {parseString}=require('xml2js');
//讲xml转化为js对象
module.exports={
    getUserDataAsync(req){
        return new Promise((resolve,reject)=>{
            let xmlData='';
        req.on('data',data=>{
            //会有三次数据反回
            //console.log(data.toString());
            //buffer
            //转换成字符串
            xmlData+=data.toString();
        })
        .on('end',()=>{
            //当数据接受完毕时会触发当前
            resolve(xmlData);
        })
        })
    },
    parseXMLAsync(xmlData){
        return new Promise((resolve,reject)=>{
            parseString(xmlData,{trim:true},(err,data)=>{
                if(!err){
                    resolve(data)
                }else{
                    reject('parsexmlasync方法除了问题'+err);
                }
            })
        })
    },
    formatMessage(jsData){
        let message={};
        //获取xml对象
        jsData=jsData.xml;
        //判断对象是否是一个对象
        if(typeof jsData==='object'){
            
                
            for(let key in jsData){
                //遍历对象
                //过滤布空数据
                //console.log(key);
                let value=jsData[key];
                //console.log(value);
                
                if(Array.isArray(value)&&jsData[key]!=null){
                    //讲合法的数据复制到message对象上
                    
                    message[key]=value[0];
                    console.log(message[key]);
                }
            }
        }

        return message;
    }
    
}