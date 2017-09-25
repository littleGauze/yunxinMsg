### 云信接口API文档
---

#### 验证码及通知类消息

```js
client.sendSMS({
    "type": "sms",	//可不传，默认为 sms(验证码及通知类消息)
    "tplType": "code",	//目前支持两种模板: code(验证码)【默认】, notify(通知)
    "receiver": "17682447866",	//接收人电话
    "content": "您请求的验证码是8888"	//验证码和通知消息
}).then(res => {
    console.log(res);
    return res;
});
```

#### 营销类消息【批量】

```js
client.sendSMS({
    "type": "promo",	//营销类消息
    "tplType": "promo",	//目前支持： promo 一种模板【默认】
    "receiverParams": {
        "defaultMsg": "测试营销短信",	//默认消息
        "list": [	//用户接收列表
            {
            	"mobile": "17682447866",
                "msg": "针对个人的营销短信"	//不传默认使用defaultMsg的消息内容
            }
        ]
    }
}).then(res => {
    console.log(res);
    return res;
});
```
