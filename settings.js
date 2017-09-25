/**
 * Created on 2017/9/22.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
module.exports = {
    signature: '短信签名',
    accessKey: '云信提供的secretKey',
    sms: {
        url: 'https://smsapi.startdt.com/v2/sms/send',
        account: '公司账号',
        tpl: {
            code: 'SMS_70335161',
            notify: 'SMS_70410271'
        }
    },
    promo: {
        url: 'https://sms.startdtapi.com/market/sms/sendBatch',
        account: '公司账号',
        tpl: {
            promo: 'SMS_70375258'
        }
    }
};