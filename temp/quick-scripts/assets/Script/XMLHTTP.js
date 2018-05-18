(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/XMLHTTP.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '563667/5RVM2oRi3WnbgwyT', 'XMLHTTP', __filename);
// Script/XMLHTTP.js

'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

cc.Class({
    extends: cc.Component,

    properties: {
        apiurl: 'http://lhhapi.wq176.cn/'
    },
    /*
    *GET方法
    *url请求链接
    *params 参数对象{‘paramidx’:'paramitem'}
    *successCallBack 成功执行操作
    *failCallBack 失败执行操作
    */
    xmlHttpGet: function xmlHttpGet(url, params, sendcookie, successCallBack, failCallBack) {
        var paramstr = '';
        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) == 'object') {
            var arrs = [];
            for (var k in params) {
                arrs.push(k + '=' + params[k]);
            }
            paramstr = '?' + arrs.join('&');
        }
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        xhr.withCredentials = true;
        if (sendcookie != '') {
            xhr.setRequestHeader("Cookie", sendcookie);
        }
        xhr.responseType = "json";
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    //cc.log(xhr.responseText);
                    var response = JSON.parse(xhr.responseText);
                    var header = { cookie: xhr.getResponseHeader("Set-Cookie") };
                    successCallBack(response, header);
                } else {
                    failCallBack(xhr.statusText);
                }
            } else {
                cc.log('请求中……' + url);
            }
        };
        xhr.ontimeout = function () {
            xhr.abort();
            failCallBack('网络请求超时');
        };
        xhr.onerror = function (e) {
            //failCallBack('网络错误');
        };
        xhr.open("GET", this.apiurl + url + paramstr, true);

        xhr.send();
    },
    /*
     *POST方法
    *url请求链接
    *params 参数对象{‘paramidx’:'paramitem'}
    *successCallBack 成功执行操作
    *failCallBack 失败执行操作
    */
    xmlHttpPost: function xmlHttpPost(url, params, sendcookie, successCallBack, failCallBack) {
        var paramstr = '';
        if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) == 'object') {
            var arrs = [];
            for (var k in params) {
                arrs.push(k + '=' + params[k]);
            }
            paramstr = arrs.join('&');
        }
        //cc.log(paramstr);
        var xhr = cc.loader.getXMLHttpRequest();
        xhr.timeout = 5000;
        xhr.withCredentials = true;
        if (sendcookie != '') {
            xhr.setRequestHeader("Cookie", sendcookie);
        }
        xhr.responseType = "json";
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status >= 200 && xhr.status < 400) {
                    var response = JSON.parse(xhr.responseText);
                    var header = { cookie: xhr.getResponseHeader("Set-Cookie") };
                    successCallBack(response, header);
                } else {
                    failCallBack(xhr.statusText);
                }
            } else {
                cc.log('请求中……' + url);
            }
        };
        xhr.ontimeout = function () {
            xhr.abort();
            failCallBack('网络请求超时');
        };
        xhr.onerror = function (e) {
            //failCallBack('网络错误');
        };
        xhr.open("POST", this.apiurl + url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(paramstr);
    }
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=XMLHTTP.js.map
        