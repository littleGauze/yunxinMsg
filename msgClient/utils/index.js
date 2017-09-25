/**
 * Created on 2017/9/21.
 * @fileoverview 请填写简要的文件说明.
 * @author gauze (Firstname Lastname)
 */
const querystring = require('querystring');
const crypto = require('crypto');
const qEnc = (val) => querystring.escape(val);

//参数排序
const sortParams = (params) => {
    let obj = {};

    Object.keys(params)
        .sort()
        .forEach(key => {
            let val = params[key];
            if (typeof val === 'object') {
                val = JSON.stringify(val);
            }
            obj[key] = val
        });

    return obj;
};

//生成query串
const generateQueryString = (params) => {
    return querystring.stringify(params);
};

module.exports = (accessKey) => {
    return {
        getSignature (params, method = 'POST') {
            //格式化参数
            params = generateQueryString(sortParams(params));

            //再进行URL encode
            params = qEnc(params);
            params = `${method}&${qEnc('/')}&${params}`;

            return crypto.createHmac('sha1', accessKey + '&')
                .update(params)
                .digest('base64');
        }
    }
};