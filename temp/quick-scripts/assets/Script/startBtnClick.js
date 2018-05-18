(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/startBtnClick.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f87b74Y3yhBJKq8Y3MylsqJ', 'startBtnClick', __filename);
// Script/startBtnClick.js

"use strict";

var XMLHTTP = require("XMLHTTP");
var startBtnClick = cc.Class({
    extends: cc.Component,

    cotr: function cotr() {},
    properties: {
        xhr: {
            default: null,
            type: XMLHTTP
        },
        btnbox: cc.Node,
        loginboard: cc.Node,
        registerboard: cc.Node,
        reguser: cc.Component,
        regpass: cc.Component,
        regconfirmpass: cc.Component,
        regtjren: cc.Component,
        loginuser: cc.Component,
        loginpass: cc.Component,
        tankuang: cc.Node,
        tankuangtxt: cc.Label
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        var userinfo = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
        if (userinfo.name) {
            this.loginuser.string = userinfo.name;
        }
    },

    //start () {},

    // update (dt) {},
    showBtnbox: function showBtnbox() {
        if (!this.btnbox.active) {
            this.btnbox.active = true;
        }
    },
    closeBtnbox: function closeBtnbox() {
        this.btnbox.active = false;
    },
    showLoginUi: function showLoginUi() {
        this.closeRegisterUi();
        this.loginboard.active = true;
    },
    closeLoginUi: function closeLoginUi() {
        this.loginboard.active = false;
    },
    showReisterUi: function showReisterUi() {
        this.closeLoginUi();
        this.registerboard.active = true;
    },
    closeRegisterUi: function closeRegisterUi() {
        this.registerboard.active = false;
    },
    httpFail: function httpFail(res) {
        var tankuang = cc.find("Canvas/box/tankuangbg");
        var tankuangtxt = cc.find("Canvas/box/tankuangbg/msgtxt").getComponent(cc.Label);
        if (!tankuang.active) {
            tankuang.active = true;
        }
        tankuangtxt.string = res;
        tankuang.getComponent(cc.Animation).play();
    },
    /*游客按钮点击事件*/
    gustBtn: function gustBtn() {
        this.xhr.xmlHttpGet('api/guestLogin.do', '', '', this.loginSuccess, this.httpFail);
    },
    tanKuang: function tanKuang(msg) {
        this.tankuangtxt.string = msg;
        this.tankuang.active = true;
        this.tankuang.getComponent(cc.Animation).play();
    },
    registerBtn: function registerBtn() {
        var username = this.reguser.string;
        var pass = this.regpass.string;
        var confirmpass = this.regconfirmpass.string;
        var tjren = parseInt(this.regtjren.string);
        var msg = '';
        if (username == '') {
            msg = "请输入用户名";
        } else if (username.length < 6) {
            msg = "帐号不能小于6位";
        } else if (pass == '') {
            msg = "请输入密码";
        } else if (pass.length < 6) {
            msg = "密码不能小于6位";
        } else if (pass != confirmpass) {
            msg = "两次密码不一致";
        } else if (isNaN(tjren) || tjren <= 0) {
            tjren = 0;
            //msg="请填写推荐人";
        }
        if (msg != '') {
            this.tanKuang(msg);
        } else {
            this.xhr.xmlHttpPost('user/registered', { 'parentId': tjren, 'username': username, 'password': pass }, '', this.loginSuccess, this.httpFail);
        }
    },
    loginSuccess: function loginSuccess(res, header) {
        if (res['error'] == 0) {
            //保存用户数据，用于游戏界面显示"utype":0游客，1帐号登录
            var udata = res['data'];
            var userinfo = { utype: res['utype'], uid: udata['uid'], type: udata['type'], coin: udata['coin'], name: udata['username'] };
            cc.sys.localStorage.setItem("userinfo", JSON.stringify(userinfo));
            cc.sys.localStorage.setItem("userCookie", header.cookie);
            cc.director.loadScene("Playgame");
        } else {
            var tankuang = cc.find("Canvas/box/tankuangbg");
            var tankuangtxt = cc.find("Canvas/box/tankuangbg/msgtxt").getComponent(cc.Label);
            tankuangtxt.string = res['msg'];
            if (!tankuang.active) {
                tankuang.active = true;
            }
            tankuang.getComponent(cc.Animation).play();
        }
    },
    loginBtn: function loginBtn() {
        var username = this.loginuser.string;
        var pass = this.loginpass.string;
        var msg = '';
        if (username == '') {
            msg = "请输入用户名";
        } else if (username.length < 6) {
            msg = "帐号不能小于6位";
        } else if (pass == '') {
            msg = "请输入密码";
        } else if (pass.length < 6) {
            msg = "密码不能小于6位";
        }
        if (msg != '') {
            this.tanKuang(msg);
        } else {
            this.xhr.xmlHttpPost('user/loginedto', { 'username': username, 'password': pass }, '', this.loginSuccess, this.httpFail);
        }
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
        //# sourceMappingURL=startBtnClick.js.map
        