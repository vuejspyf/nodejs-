//处理用户发送的消息类型和内容 决定返回不同的内容给用户
module.exports=(message)=>{
    let options={
        toUserName:message.FromUserName,
        fromUserName:message.ToUserName,
        createTime:Date.now(),
        msgType:'text'

      }




    let content='你在说什么我听不懂';
    if(message.MsgType=='text'){
      if(message.Content=='1' ){
       content= 'pyf 加油  you can up you are so great';
      }else if(message.Content=='2'){
        content='稳住';
      }else if(message.Content.match('爱')){
        content='i love you too kiss me ';
        //半匹配
      }
    }else if(message.MsgType==='image'){
        options.msgType='image';
        options.mediaId=message.MediaId;
        console.log(message.PicUrl);
    }else if(message.MsgType==='voice'){
        options.msgType='voice';
        options.mediaId=message.MediaId;
        console.log(message.Recognition);
    }else if(message.MsgType=='location'){
        content='维度:'+message.Location_X+'经度'+message.Location_Y+'缩放大小'+message.Scale+'位置信息：'+message.Label;
    }else if(message.MsgType==='event'){
        if(message.Event==='subscribe'){
            content='欢迎你的关注';
            if(message.EventKey){
                content='用户扫描带参数的二维码关注事件';
            }
        }else if(message.MsgType==='unsubscribe'){
            console.log('无情取关----');
            console.log("why i can't see");
        }else if(message.Event==='SCAN'){
            content='用户已经关注过 在扫描带参数的二维码关注事件';
        }else if(message.Event==='LOCATION'){
            content='维度:'+message.Latitude+'经度'+message.Longitude+'精度'+message.Precision;
        }else if(message.Event==='CLICK'){
            content='你点击按钮：'+message.EventKey;
        }
    }

    options.content=content;
    console.log(options);
    return options;
}