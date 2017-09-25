/**
 * Created on 2017/9/22.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const requestPromise = require('request-promise');
const Utils = require('./utils');
const mobileReg = /1[35678]\d{9}/;
const METHOD = 'POST';

//格式化营销短信的接收参数
const parseReceiverParams = ({defaultMsg, list = []} = {}) => {
    let obj = {};

    for (let {mobile = '', msg} of list) {
        if (!mobileReg.test(mobile)) continue;
        obj[mobile] = {content: msg || defaultMsg};
    }

    return obj;
};

module.exports = config => {
    const {signature, accessKey, sms = {}, promo = {}} = config || {};
    const {getSignature} = Utils(accessKey);
    const request = (uri, params) => {
        delete params.type;
        delete params.tplType;

        //格式化参数
        params.timestamp = Date.now();

        //根据参数生成签名
        const sign = getSignature(params, METHOD);
        params.sign = sign;

        return requestPromise({
            uri,
            method: METHOD,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: params,
            json: true
        });
    };

    //发送验证码和通知类短信
    const sendNotifySms  = (params) => {
        const {url, account, tpl = {}} = sms;
        let {receiver, content, tplType = 'code'} = params;

        //没有有效的电话号码
        if (!mobileReg.test(receiver)) return false;

        params.templateParam = JSON.stringify({content});
        params.account = account;
        params.templateCode = tpl[tplType];
        delete params.content;

        return request(url, params);
    };

    //发送营销类短息
    const sendPromoSms = (params) => {
        const {url, account, tpl} = promo;
        let {receiverParams, tplType = 'promo'} = params;

        params.receiverParams = parseReceiverParams(receiverParams);
        params.account = account;
        params.templateCode = tpl[tplType];

        return request(url, params);
    };

    return {
        sendSMS (params) {
            const type = params.type || 'sms';

            params.signType = 'HMAC';
            params.smsSignName = signature;

            let result;
            if (type === 'sms') {
                //验证码及通知类的短信
                result = sendNotifySms(params);
            } else {
                //营销类短信
                result = sendPromoSms(params);
            }

            return result;
        }
    }
};
