/**
 * Created on 2017/9/21.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const config = require('./settings');
const msgClient = require('./msgClient');
const client = msgClient(config);

//验证码及通知类
client.sendSMS({
    "receiver": "17682447866",
    "content": "您请求的验证码是8888"
}).then(res => {
    console.log(res);
    return res;
});

//营销短信
//client.sendSMS({
//    "type": "promo",
//    "receiverParams": {
//        "defaultMsg": "测试营销短信",
//        "list": [
//            {
//                "mobile": "17682447866",
//                "msg": "针对个人的营销短信"
//            }
//        ]
//    }
//});
