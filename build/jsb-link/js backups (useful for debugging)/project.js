require = function o(s, c, r) {
function l(n, t) {
if (!c[n]) {
if (!s[n]) {
var e = "function" == typeof require && require;
if (!t && e) return e(n, !0);
if (u) return u(n, !0);
var i = new Error("Cannot find module '" + n + "'");
throw i.code = "MODULE_NOT_FOUND", i;
}
var a = c[n] = {
exports: {}
};
s[n][0].call(a.exports, function(t) {
var e = s[n][1][t];
return l(e || t);
}, a, a.exports, o, s, c, r);
}
return c[n].exports;
}
for (var u = "function" == typeof require && require, t = 0; t < r.length; t++) l(r[t]);
return l;
}({
LanguageData: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "61de062n4dJ7ZM9/Xdumozn", "LanguageData");
var i = t("polyglot.min"), a = null;
window.i18n || (window.i18n = {
languages: {},
curLang: ""
});
0;
function o(t) {
return window.i18n.languages[t];
}
function s(t) {
t && (a ? a.replace(t) : a = new i({
phrases: t,
allowMissing: !0
}));
}
e.exports = {
init: function(t) {
if (t !== window.i18n.curLang) {
var e = o(t) || {};
window.i18n.curLang = t;
s(e);
this.inst = a;
}
},
t: function(t, e) {
if (a) return a.t(t, e);
},
inst: a,
updateSceneRenderers: function() {
for (var t = cc.director.getScene().children, e = [], n = 0; n < t.length; ++n) {
var i = t[n].getComponentsInChildren("LocalizedLabel");
Array.prototype.push.apply(e, i);
}
for (var a = 0; a < e.length; ++a) {
e[a].updateLabel();
}
for (var o = [], s = 0; s < t.length; ++s) {
var c = t[s].getComponentsInChildren("LocalizedSprite");
Array.prototype.push.apply(o, c);
}
for (var r = 0; r < o.length; ++r) {
o[r].updateSprite(window.i18n.curLang);
}
}
};
cc._RF.pop();
}, {
"polyglot.min": "polyglot.min"
} ],
LocalizedLabel: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "744dcs4DCdNprNhG0xwq6FK", "LocalizedLabel");
var i = t("LanguageData");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
menu: "i18n/LocalizedLabel"
},
properties: {
dataID: {
get: function() {
return this._dataID;
},
set: function(t) {
if (this._dataID !== t) {
this._dataID = t;
this.updateLabel();
}
}
},
_dataID: ""
},
onLoad: function() {
0;
i.inst || i.init();
this.fetchRender();
},
fetchRender: function() {
var t = this.getComponent(cc.Label);
if (t) {
this.label = t;
this.updateLabel();
} else ;
},
updateLabel: function() {
if (this.label) {
i.t(this.dataID) && (this.label.string = i.t(this.dataID));
} else cc.error("Failed to update localized label, label component is invalid!");
}
});
cc._RF.pop();
}, {
LanguageData: "LanguageData"
} ],
LocalizedSprite: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "f34ac2GGiVOBbG6XlfvgYP4", "LocalizedSprite");
var i = t("SpriteFrameSet");
cc.Class({
extends: cc.Component,
editor: {
executeInEditMode: !0,
inspector: "packages://i18n/inspector/localized-sprite.js",
menu: "i18n/LocalizedSprite"
},
properties: {
spriteFrameSet: {
default: [],
type: i
}
},
onLoad: function() {
this.fetchRender();
},
fetchRender: function() {
var t = this.getComponent(cc.Sprite);
if (t) {
this.sprite = t;
this.updateSprite(window.i18n.curLang);
} else ;
},
getSpriteFrameByLang: function(t) {
for (var e = 0; e < this.spriteFrameSet.length; ++e) if (this.spriteFrameSet[e].language === t) return this.spriteFrameSet[e].spriteFrame;
},
updateSprite: function(t) {
if (this.sprite) {
var e = this.getSpriteFrameByLang(t);
!e && this.spriteFrameSet[0] && (e = this.spriteFrameSet[0].spriteFrame);
this.sprite.spriteFrame = e;
} else cc.error("Failed to update localized sprite, sprite component is invalid!");
}
});
cc._RF.pop();
}, {
SpriteFrameSet: "SpriteFrameSet"
} ],
SpriteFrameSet: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "97019Q80jpE2Yfz4zbuCZBq", "SpriteFrameSet");
var i = cc.Class({
name: "SpriteFrameSet",
properties: {
language: "",
spriteFrame: cc.SpriteFrame
}
});
e.exports = i;
cc._RF.pop();
}, {} ],
XMLHTTP: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "563667/5RVM2oRi3WnbgwyT", "XMLHTTP");
var l = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};
cc.Class({
extends: cc.Component,
properties: {
apiurl: "http://lhhapi.wq176.cn/"
},
xmlHttpGet: function(n, t, e, i, a) {
var o = "";
if ("object" == ("undefined" == typeof t ? "undefined" : l(t))) {
var s = [];
for (var c in t) s.push(c + "=" + t[c]);
o = "?" + s.join("&");
}
var r = cc.loader.getXMLHttpRequest();
r.timeout = 5e3;
r.withCredentials = !0;
"" != e && r.setRequestHeader("Cookie", e);
r.responseType = "json";
r.onreadystatechange = function() {
if (4 == r.readyState) if (200 <= r.status && r.status < 400) {
var t = JSON.parse(r.responseText), e = {
cookie: r.getResponseHeader("Set-Cookie")
};
i(t, e);
} else a(r.statusText); else cc.log("请求中……" + n);
};
r.ontimeout = function() {
r.abort();
a("网络请求超时");
};
r.onerror = function(t) {};
r.open("GET", this.apiurl + n + o, !0);
r.send();
},
xmlHttpPost: function(n, t, e, i, a) {
var o = "";
if ("object" == ("undefined" == typeof t ? "undefined" : l(t))) {
var s = [];
for (var c in t) s.push(c + "=" + t[c]);
o = s.join("&");
}
var r = cc.loader.getXMLHttpRequest();
r.timeout = 5e3;
r.withCredentials = !0;
"" != e && r.setRequestHeader("Cookie", e);
r.responseType = "json";
r.onreadystatechange = function() {
if (4 == r.readyState) if (200 <= r.status && r.status < 400) {
var t = JSON.parse(r.responseText), e = {
cookie: r.getResponseHeader("Set-Cookie")
};
i(t, e);
} else a(r.statusText); else cc.log("请求中……" + n);
};
r.ontimeout = function() {
r.abort();
a("网络请求超时");
};
r.onerror = function(t) {};
r.open("POST", this.apiurl + n, !0);
r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
r.send(o);
}
});
cc._RF.pop();
}, {} ],
gameBtnClick: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "510eauljfxE3paGMCLbazSY", "gameBtnClick");
var i = t("XMLHTTP");
cc.Class({
extends: cc.Component,
properties: {
xhr: {
default: null,
type: i
},
audioSource: {
type: cc.AudioSource,
default: null
},
displayBoard: cc.Node,
ruleBoard: cc.Node,
trendBoard: cc.Node,
stakeBoard: cc.Node,
stakeBox: cc.Node,
editpassBoard: cc.Node,
oldMima: cc.Component,
newMima: cc.Component,
animatefireArr: {
default: [],
type: [ cc.Node ]
},
stakeMoney: 0,
stakeBtnsprite: {
default: null,
type: cc.Sprite
},
goldClips: {
default: [],
type: [ cc.Sprite ]
},
tanKuang: {
default: null,
type: cc.Node
},
userGold: {
default: null,
type: cc.Label
},
otherAudios: {
default: [],
type: [ cc.AudioSource ]
},
issueLable: {
default: null,
type: cc.Label
},
longLable: {
default: null,
type: cc.Label
},
huLable: {
default: null,
type: cc.Label
},
heLable: {
default: null,
type: cc.Label
}
},
onLoad: function() {
this.betArr = [];
this.totalMoneys = 0;
this.mygoldSprite = [];
this.userCookie = cc.sys.localStorage.getItem("userCookie");
this.userloginInfo = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
},
httpFail: function(t) {
var e = cc.find("Canvas/game/tankuangbg"), n = cc.find("Canvas/game/tankuangbg/msgtxt").getComponent(cc.Label);
e.active || (e.active = !0);
n.string = t;
e.getComponent(cc.Animation).play();
},
createGoldsprite: function(t, e) {
var n = new cc.Node("goldclip");
n.addComponent(cc.Sprite).spriteFrame = e;
n.parent = t;
n.setScale(.25, .25);
var i = Math.floor(50 * Math.random() - 100 * Math.random()), a = Math.floor(50 * Math.random() - 100 * Math.random());
n.setPositionX(i);
n.setPositionY(a);
this.mygoldSprite.push(n);
},
controlStakeAnimate: function(t) {
for (var e = this.stakeBox.children, n = 0; n < this.animatefireArr.length; ++n) if (e[n]._name === t.target._name) {
this.animatefireArr[n].active = !0;
var i = e[n].getChildByName("yztxt").getComponent(cc.Label).string;
this.stakeMoney = parseInt(i);
this.stakeBtnsprite = e[n].getComponent(cc.Sprite);
} else this.animatefireArr[n].active = !1;
},
stakeType: function(t) {
var e = t.target, n = e.getChildByName("goldbox"), i = e.getChildByName("stakebg").getChildByName("staketxt").getComponent(cc.Label), a = i.string.slice(3), o = this.userGold.string.slice(1);
this.totalMoneys += this.stakeMoney;
if (parseInt(o) >= this.totalMoneys) {
var s = parseInt(a) + this.stakeMoney;
this.createGoldsprite(n, this.stakeBtnsprite.spriteFrame);
i.string = "下注：" + s;
var c = new Array();
"dragon" === e._name ? c.playId = "dragon" : "tiger" === e._name ? c.playId = "tiger" : "tie" === e._name && (c.playId = "tie");
c.money = this.stakeMoney;
this.betArr.push(c);
} else {
this.tanKuang.active || (this.tanKuang.active = !0);
this.tanKuang.getChildByName("msgtxt").getComponent(cc.Label).string = "您的金币不足,请充值后再押注！";
this.tanKuang.getComponent(cc.Animation).play();
this.totalMoneys -= this.stakeMoney;
}
},
resetBetClick: function() {
var t = this.totalMoneys = 0, e = 0, n = 0;
if (0 < this.betArr.length) {
for (var i = this.betArr, a = 0; a < i.length; a++) {
"dragon" == i[a].playId && (t += parseInt(i[a].money));
"tiger" == i[a].playId && (e += parseInt(i[a].money));
"tie" == i[a].playId && (n += parseInt(i[a].money));
}
this.longLable.string = "下注：" + (parseInt(this.longLable.string.slice(3)) - t);
this.huLable.string = "下注：" + (parseInt(this.huLable.string.slice(3)) - e);
this.heLable.string = "下注：" + (parseInt(this.heLable.string.slice(3)) - n);
}
this.betArr = [];
if (0 < this.mygoldSprite.length) for (var o = 0; o < this.mygoldSprite.length; o++) this.mygoldSprite[o].destroy();
this.mygoldSprite = [];
},
gameBetClick: function() {
if (0 < this.betArr.length) {
var t = this.betArr, e = Global.issue, n = Global.endtime, i = new Date(n).getTime() / 1e3, a = new Array(), o = new Array();
o.playId = 1105;
o.money = 0;
var s = new Array();
s.playId = 1106;
s.money = 0;
var c = new Array();
c.playId = 1107;
for (var r = c.money = 0; r < t.length; r++) "dragon" == t[r].playId ? o.money += parseInt(t[r].money) : "tiger" == t[r].playId ? s.money += t[r].money : "tie" == t[r].playId && (c.money += t[r].money);
0 < o.money && a.push(o);
0 < s.money && a.push(s);
0 < c.money && a.push(c);
for (var l = 0, u = 0; u < a.length; u++) l += a[u].money;
var h = this.userGold.string.slice(1);
if (l <= parseInt(h)) {
this.userGold.string = "$" + (parseInt(h) - l);
for (var d = {
gameId: 1,
turnNum: e,
totalNums: a.length,
totalMoney: l,
ftime: i
}, g = 0; g < a.length; g++) {
d["betBean[" + g + "][playId]"] = a[g].playId;
d["betBean[" + g + "][money]"] = a[g].money;
}
this.xhr.xmlHttpPost("Data/postCode", d, this.userCookie, this.gameBetCallback.bind(this), this.httpFail);
var p = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
p.coin > l && (p.coin -= l);
cc.sys.localStorage.setItem("userinfo", JSON.stringify(p));
cc.find("Canvas/game/bottom/botbg/userinfo/usercoin/usercointxt").getComponent(cc.Label).string = "$" + p.coin;
} else {
this.tanKuang.active || (this.tanKuang.active = !0);
this.tanKuang.getChildByName("msgtxt").getComponent(cc.Label).string = "您的金币不足,请充值后再押注！";
this.tanKuang.getComponent(cc.Animation).play();
}
}
},
gameBetCallback: function(t, e) {
if (t.success) {
var n = {
longzhu: this.longLable.string.slice(3),
huzhu: this.huLable.string.slice(3),
hezhu: this.heLable.string.slice(3)
}, i = this.issueLable.string.slice(0, 11) + this.userloginInfo.uid;
cc.sys.localStorage.setItem(i, JSON.stringify(n));
this.totalMoneys = 0;
this.betArr = [];
this.mygoldSprite = [];
}
if (t.msg) {
var a = cc.find("Canvas/tankuangbg"), o = cc.find("Canvas/tankuangbg/msgtxt").getComponent(cc.Label);
a.active || (a.active = !0);
o.string = t.msg;
a.getComponent(cc.Animation).play();
this.xhr.xmlHttpPost("game/getUserMsg.do", "", this.userCookie, this.changeUserinfo, this.httpFail);
}
},
changeUserinfo: function(t, e) {
cc.log(t.balance);
if (0 <= t.balance) {
var n = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
n.coin = t.balance;
cc.sys.localStorage.setItem("userinfo", JSON.stringify(n));
cc.find("Canvas/game/bottom/botbg/userinfo/usercoin/usercointxt").getComponent(cc.Label).string = "$" + t.balance;
cc.log(t.balance);
}
},
controlBgAudio: function(t) {
if (t.isChecked) {
this.audioSource.stop();
for (var e = 0; e < this.otherAudios.length; e++) this.otherAudios[e].mute = 1;
} else {
this.audioSource.play();
for (var n = 0; n < this.otherAudios.length; n++) this.otherAudios[n].mute = 0;
}
},
showTankuang: function(t) {
this.tanKuang.getChildByName("msgtxt").getComponent(cc.Label).string = t;
this.tanKuang.active || (this.tanKuang.active = !0);
},
closeTankuang: function() {
this.tanKuang.active && (this.tanKuang.active = !1);
},
showDisplayBoard: function() {
this.displayBoard.active = !0;
},
closeDisplayBoard: function() {
this.displayBoard.active = !1;
},
closeAllBoard: function() {
this.ruleBoard.active && (this.ruleBoard.active = !1);
this.trendBoard.active && (this.trendBoard.active = !1);
this.stakeBoard.active && (this.stakeBoard.active = !1);
this.editpassBoard.active && (this.editpassBoard.active = !1);
},
showRuleBoard: function() {
this.closeAllBoard();
this.ruleBoard.active = !0;
},
closeRuleBoard: function() {
this.ruleBoard.active = !1;
},
kjData: function(t, e) {
if (0 < t.length) {
for (var n = cc.find("Canvas/displayboard/trendboard/trendbg/trendScrollView/view/content"), i = cc.find("Canvas/displayboard/trendboard/trendbg/trendScrollView/view/content/datatable"), a = n.children.length, o = (1 < a ? t.length : t.length - a - 1) - 1; 0 <= o; o--) {
var s = cc.instantiate(i);
s.getChildByName("qishu").getComponent(cc.Label).string = t[o].turnNum;
s.getChildByName("time").getComponent(cc.Label).string = t[o].openTime;
s.getChildByName("numberbox").children[0].getComponent(cc.Label).string = t[o].n1;
s.getChildByName("numberbox").children[1].getComponent(cc.Label).string = t[o].n2;
s.getChildByName("numberbox").children[2].getComponent(cc.Label).string = t[o].n3;
s.getChildByName("numberbox").children[3].getComponent(cc.Label).string = t[o].n4;
s.getChildByName("numberbox").children[4].getComponent(cc.Label).string = t[o].n5;
var c = t[o].n1 > t[o].n5 ? "<color=#ca0715>龙</color>" : t[o].n1 < t[o].n5 ? "<color=#2396ea>虎</color>" : "<color=#1fbe00>和</color>";
s.getChildByName("lhh").getComponent(cc.RichText).string = c;
s.active = !0;
n.addChild(s);
}
cc.find("Canvas/tankuangbg").active = !1;
}
},
stakeData: function(t, e) {
if (t.data) {
for (var n = cc.find("Canvas/displayboard/stakeboard/stakebg/stakeScrollView/view/content"), i = cc.find("Canvas/displayboard/stakeboard/stakebg/stakeScrollView/view/content/dataitem"), a = t.data, o = 0; o < a.length; o++) {
var s = cc.instantiate(i);
s.getChildByName("xiazhuqishu").getComponent(cc.Label).string = a[o].turnNum;
s.getChildByName("xiazhushijian").getComponent(cc.Label).string = a[o].addTime.slice(11);
s.getChildByName("money").getComponent(cc.RichText).string = "<color=#F0DC0C>" + a[o].betmoney + "</color>";
s.getChildByName("shuying").getComponent(cc.RichText).string = Global.issue == a[o].turnNum ? "--" : a[o].resultMoney < 0 ? "<color=#ca0715>" + a[o].resultMoney + "</color>" : "<color=#1fbe00>" + a[o].resultMoney + "</color>";
var c = 1105 == a[o].playId ? "<color=#ca0715>龙</color>" : 1106 == a[o].playId ? "<color=#2396ea>虎</color>" : "<color=#1fbe00>和</color>";
s.getChildByName("lhh").getComponent(cc.RichText).string = c;
s.active = !0;
n.addChild(s);
}
cc.find("Canvas/tankuangbg").active = !1;
} else cc.find("Canvas/tankuangbg").active = !1;
},
showTrendBoard: function() {
this.closeAllBoard();
this.trendBoard.active = !0;
this.showTankuang("数据获取中……");
this.xhr.xmlHttpGet("game/getHistory.do", {
count: 30
}, this.userCookie, this.kjData, this.httpFail);
},
closeTrendBoard: function() {
this.trendBoard.active = !1;
this.closeTankuang();
},
showStakeBoard: function() {
this.closeAllBoard();
this.stakeBoard.active = !0;
this.showTankuang("数据获取中……");
cc.log(this.userCookie);
this.xhr.xmlHttpGet("report/getBetBills.do", "", this.userCookie, this.stakeData, this.httpFail);
},
closeStakeBoard: function() {
for (var t = cc.find("Canvas/displayboard/stakeboard/stakebg/stakeScrollView/view/content").children, e = 0; e < t.length; e++) 1 < e && t[e].destroy();
this.stakeBoard.active = !1;
this.closeTankuang();
},
showEditpassBoard: function() {
this.closeAllBoard();
this.editpassBoard.active = !0;
},
closeEditpassBoard: function() {
this.editpassBoard.active = !1;
},
editPassClick: function() {
var t = this.oldMima.string, e = this.newMima.string;
cc.log(t);
cc.log(e);
var n = "";
"" == t || "" == e ? n = "请输入密码" : t.length < 6 || e.length < 6 ? n = "密码长度不能小于6位" : e == t && (n = "新密码不能和原密码相同");
if ("" != n) {
cc.log(n);
this.showTankuang(n);
this.tanKuang.getComponent(cc.Animation).play();
} else this.xhr.xmlHttpPost("safe/setPasswd.do", {
oldPwd: t,
newPwd: e
}, this.userCookie, this.editSuccess, this.httpFail);
},
editSuccess: function(t, e) {
if (t) {
var n = cc.find("Canvas/tankuangbg");
cc.find("Canvas/tankuangbg/msgtxt").getComponent(cc.Label).string = t.msg;
n.active || (n.active = !0);
n.getComponent(cc.Animation).play();
}
},
quitGame: function() {
this.xhr.xmlHttpGet("user/logout", "", "", function(t) {
cc.sys.localStorage.removeItem("userCookie");
cc.director.loadScene("Startgame");
}, function(t) {
cc.log(t);
});
}
});
cc._RF.pop();
}, {
XMLHTTP: "XMLHTTP"
} ],
game: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "de8bcbijfdOYYrMqhHWFdPa", "game");
var i = t("XMLHTTP");
window.Global = {
preIssue: "",
issue: "",
servertime: null,
endtime: null,
lotteryTime: null,
is_balance: !1,
fengpan: !1,
timing: !1
};
cc.Class({
extends: cc.Component,
properties: {
xhr: {
default: null,
type: i
},
userIdtxt: cc.Label,
userCointxt: cc.Label,
kjAudio: {
default: null,
type: cc.AudioSource
},
longBetbtn: {
default: null,
type: cc.Button
},
huBetbtn: {
default: null,
type: cc.Button
},
heBetbtn: {
default: null,
type: cc.Button
},
confirmBetbtn: {
default: null,
type: cc.Button
},
deskTexture: {
default: null,
type: cc.Node
},
longOadd: {
default: null,
type: cc.Label
},
huOadd: {
default: null,
type: cc.Label
},
heOadd: {
default: null,
type: cc.Label
},
goldiconBox: {
default: null,
type: cc.Node
},
iconBases: {
default: [],
type: [ cc.Node ]
},
balanceState: {
default: null,
type: cc.Node
},
balancedState: {
default: null,
type: cc.Node
},
longLable: {
default: null,
type: cc.Label
},
huLable: {
default: null,
type: cc.Label
},
heLable: {
default: null,
type: cc.Label
},
tanKuangNode: {
default: null,
type: cc.Node
},
displayBoard: {
default: null,
type: cc.Node
},
isLoading: {
default: null,
type: cc.Label
},
resetBtn: {
default: null,
type: cc.Button
},
lblNotice: cc.Label
},
onLoad: function() {
this.userCookie = cc.sys.localStorage.getItem("userCookie");
this.userCookie || cc.director.loadScene("Startgame");
cc.game.on(cc.game.EVENT_HIDE, function() {
cc.log("游戏进入后台");
}.bind(this));
cc.game.on(cc.game.EVENT_SHOW, this.getNextIssue.bind(this));
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
this.userloginInfo = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
this.quitgame = 0;
this.getNextIssue();
this.getOdds();
this.getHistory();
this.userInfo();
this.schedule(function() {
this.topInfo();
}, 1);
},
onDestroy: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onKeyDown: function(t) {
switch (t.keyCode) {
case cc.KEY.back:
this.quitgame++;
}
},
onKeyUp: function(t) {
switch (t.keyCode) {
case cc.KEY.back:
if (2 <= this.quitgame) cc.director.end(); else {
this.tanKuangNode.active || (this.tanKuangNode.active = !0);
this.tanKuangNode.getChildByName("msgtxt").getComponent(cc.Label).string = "再按一次退出游戏";
this.tanKuangNode.getComponent(cc.Animation).play();
this.scheduleOnce(function() {
this.quitgame = 0;
}, 1);
}
}
},
update: function(t) {
var e = this.lblNotice.node.x;
(e -= 100 * t) + this.lblNotice.node.width < -800 && (e = 500);
this.lblNotice.node.x = e;
},
httpFail: function(t) {
var e = cc.find("Canvas/tankuangbg"), n = cc.find("Canvas/tankuangbg/msgtxt").getComponent(cc.Label);
if (!e.active) {
e.active = !0;
n.string = t;
e.getComponent(cc.Animation).play();
}
},
getServiceResult: function() {
this.xhr.xmlHttpGet("config/config.js", "", this.userCookie, this.setNotice.bind(this), this.httpFail);
},
setNotice: function(t, e) {
this.lblNotice.string = t.webCloseServiceResult;
},
getNextIssue: function() {
this.isLoading.string = 0;
this.displayBoard.active || (this.displayBoard.active = !0);
this.tanKuangNode.active || (this.tanKuangNode.active = !0);
this.getServiceResult();
this.tanKuangNode.getChildByName("msgtxt").getComponent(cc.Label).string = "正在请求数据……";
this.xhr.xmlHttpGet("static/data/NextIssue.js", "", this.userCookie, this.setkjInfo.bind(this), this.httpFail);
this.scheduleOnce(this.fn, 5);
},
fn: function() {
if (0 == this.isLoading.string) {
cc.log("再次请求");
this.getNextIssue();
}
},
getHistory: function() {
this.xhr.xmlHttpGet("game/getHistory.do", {
count: 10
}, this.userCookie, this.showTrend, this.httpFail);
},
getOdds: function() {
this.xhr.xmlHttpGet("game/getPlayeds", "", this.userCookie, this.showOdds.bind(this), this.httpFail);
},
showOdds: function(t, e) {
if (t) {
this.longOadd.string = "x" + t.LONG.odds;
this.huOadd.string = "x" + t.HU.odds;
this.heOadd.string = "x" + t.TOTAL.odds;
}
},
setkjInfo: function(t, e) {
if (t.preNum) {
this.isLoading.string = 1;
this.tanKuangNode.active && (this.tanKuangNode.active = !1);
this.displayBoard.active && (this.displayBoard.active = !1);
cc.find("Canvas/game/top/lotteryinfo/kjqishu").getComponent(cc.Label).string = t.preIssue + "期开奖";
for (var n = t.preNum.split(","), i = cc.find("Canvas/game/top/lotteryinfo").children, a = 0; a < i.length; a++) "lotterynumbers" === i[a]._name && (i[a].getChildByName("number").getComponent(cc.Label).string = n[a - 1]);
cc.find("Canvas/game/top/lotteryinfo/jjkjqishu").getComponent(cc.Label).string = t.issue + "期";
var o = t.issue + this.userloginInfo.uid, s = cc.sys.localStorage.getItem(o);
if (s) {
var c = JSON.parse(s);
this.longLable.string = "下注：" + c.longzhu;
this.huLable.string = "下注：" + c.huzhu;
this.heLable.string = "下注：" + c.hezhu;
}
Global.issue = t.issue;
Global.preIssue = t.preIssue;
Global.endtime = new Date(t.endtime).getTime();
Global.lotteryTime = new Date(t.lotteryTime).getTime();
Global.servertime = new Date(t.serverTime).getTime();
Global.timing = !0;
cc.log("开始倒计时");
"" != Global.issue && "" != Global.preIssue && (1 < parseInt(Global.issue) - parseInt(Global.preIssue) ? this.checkDrawed() : this.activateBetbtn());
} else this.isLoading.string = 0;
},
showTrend: function(t, e) {
if (0 < t.length) {
for (var n = cc.find("Canvas/game/bottom/trendbox/trendicons"), i = n.children, a = 0; a < i.length; a++) 2 < a && i[a].destroy();
for (var o = n.getChildByName("longicon"), s = n.getChildByName("huicon"), c = n.getChildByName("heicon"), r = 0; r < 10; r++) {
var l = t[r].n1 > t[r].n5 ? o : t[r].n1 < t[r].n5 ? s : c, u = cc.instantiate(l);
u.active = !0;
n.addChild(u);
}
}
},
userInfo: function() {
var t = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
this.userIdtxt.string = 0 < t.utype ? "ID:" + t.uid : "游客";
this.userCointxt.string = "$" + t.coin;
this.schedule(function() {
this.xhr.xmlHttpPost("game/getUserMsg.do", "", this.userCookie, this.changeUserinfo, this.httpFail);
}, 30);
},
topInfo: function() {
if (Global.endtime && Global.lotteryTime && Global.timing) {
var t = Global.endtime, e = Global.lotteryTime;
if (null != Global.servertime) {
var n = Global.servertime;
Global.servertime = Global.servertime + 1e3;
var i = (t - n) / 1e3, a = (e - n) / 1e3, o = this.difftime(i), s = this.difftime(a), c = cc.find("Canvas/game/top/lotteryinfo/Sealing").getComponent(cc.Label), r = cc.find("Canvas/game/top/lotteryinfo/draw").getComponent(cc.Label);
c.string = "封盘：" + this.getBetTimeStr(o);
r.string = "开奖：" + this.getDrawTimeStr(s);
cc.find("Canvas/kaijiangAudio").getComponent(cc.AudioSource);
if (a <= 0) {
Global.timing = !1;
cc.log("停止倒计时");
this.getNextIssue();
Global.fengpan = !1;
}
}
}
},
checkDrawed: function() {
this.schedule(this.kjfun, 2);
},
kjfun: function() {
if (Global.is_balance) {
Global.is_balance = !1;
this.unschedule(this.kjfun);
this.kjAudio.getComponent(cc.AudioSource).play();
this.getHistory();
this.balanceState.active = !1;
if (!this.balancedState.active) {
this.balancedState.active = !0;
this.balancedState.getComponent(cc.Animation).play();
}
this.clearGoldsprite();
this.activateBetbtn();
this.xhr.xmlHttpPost("game/getUserMsg.do", "", this.userCookie, this.changeUserinfo, this.httpFail);
} else {
this.balanceState.active = !0;
this.banBetbtn();
this.xhr.xmlHttpGet("static/data/CurIssue.js", "", this.userCookie, this.settleAccounts.bind(this), this.httpFail);
}
},
settleAccounts: function(t, e) {
if (t && t.issue == parseInt(Global.issue) - 1) {
Global.is_balance = !0;
cc.find("Canvas/game/top/lotteryinfo/kjqishu").getComponent(cc.Label).string = t.issue + "期开奖";
for (var n = t.nums.split(","), i = cc.find("Canvas/game/top/lotteryinfo").children, a = 0; a < i.length; a++) "lotterynumbers" === i[a]._name && (i[a].getChildByName("number").getComponent(cc.Label).string = n[a - 1]);
}
},
difftime: function(t) {
return 0 < t ? {
day: Math.floor(t / 86400),
hour: Math.floor(t % 86400 / 3600),
minute: Math.floor(t % 3600 / 60),
second: Math.floor(t % 60)
} : {
day: 0,
hour: 0,
minute: 0,
second: 0
};
},
fftime: function(t) {
return Number(t) < 10 ? "0" + Number(t) : Number(t);
},
banBetbtn: function() {
this.unschedule(this.creatOthergold);
this.longBetbtn.interactable && (this.longBetbtn.interactable = !1);
this.huBetbtn.interactable && (this.huBetbtn.interactable = !1);
this.heBetbtn.interactable && (this.heBetbtn.interactable = !1);
this.confirmBetbtn.interactable && (this.confirmBetbtn.interactable = !1);
this.resetBtn.interactable && (this.resetBtn.interactable = !1);
},
activateBetbtn: function() {
this.longBetbtn.interactable || (this.longBetbtn.interactable = !0);
this.huBetbtn.interactable || (this.huBetbtn.interactable = !0);
this.heBetbtn.interactable || (this.heBetbtn.interactable = !0);
this.confirmBetbtn.interactable || (this.confirmBetbtn.interactable = !0);
this.resetBtn.interactable || (this.resetBtn.interactable = !0);
this.schedule(this.creatOthergold, 1);
},
getBetTimeStr: function(t) {
if (!t) {
this.banBetbtn();
Global.fengpan = !0;
return "已封盘";
}
var e = (0 < t.day ? t.day + "天" : "") + (0 < t.hour ? this.fftime(t.hour) + ":" : "") + this.fftime(t.minute) + ":" + this.fftime(t.second);
if ("00:00" == e) {
this.banBetbtn();
Global.fengpan = !0;
return "已封盘";
}
return e;
},
getDrawTimeStr: function(t) {
if (!t) {
this.banBetbtn();
return "已结束";
}
var e = (0 < t.day ? t.day + lot_lang.dec_s21 + " " : "") + (0 < t.hour ? this.fftime(t.hour) + ":" : "") + this.fftime(t.minute) + ":" + this.fftime(t.second);
if ("00:00" == e) {
this.banBetbtn();
return "已结束";
}
return e;
},
changeUserinfo: function(t, e) {
if (t.balance) {
var n = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
n.coin = t.balance;
cc.sys.localStorage.setItem("userinfo", JSON.stringify(n));
cc.find("Canvas/game/bottom/botbg/userinfo/usercoin/usercointxt").getComponent(cc.Label).string = "$" + t.balance;
}
},
creatOthergold: function() {
for (var t = this.iconBases, e = 0; e < t.length; e++) {
t[e].active || (t[e].active = !0);
t[e].getComponent("putInIcons").startMoveAt();
}
this.unschedule(this.creatOthergold);
var n = Math.round(4 * Math.random());
this.schedule(this.creatOthergold, [ 5, 10, 15, 20, 25 ][n]);
},
clearGoldsprite: function() {
for (var t = this.deskTexture.children, e = 0; e < t.length; e++) {
var n = t[e].getChildByName("goldbox");
t[e].getChildByName("stakebg").getChildByName("staketxt").getComponent(cc.Label).string = "下注：0";
var i = n.children;
if (0 < i.length) for (var a = 0; a < i.length; a++) i[a].destroy();
}
for (var o = this.goldiconBox.children, s = 0; s < o.length; s++) o[s].destroy();
}
});
cc._RF.pop();
}, {
XMLHTTP: "XMLHTTP"
} ],
"polyglot.min": [ function(t, e, n) {
"use strict";
cc._RF.push(e, "e26fd9yy65A4q3/JkpVnFYg", "polyglot.min");
var i, a, o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
return typeof t;
} : function(t) {
return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
};
i = void 0, a = function(e) {
function t(t) {
t = t || {}, this.phrases = {}, this.extend(t.phrases || {}), this.currentLocale = t.locale || "en", 
this.allowMissing = !!t.allowMissing, this.warn = t.warn || n;
}
function a(t, e, n) {
var i, a, o, s, c, r, l;
return null != n && t ? (o = (a = t.split(u))[(s = e, c = n, h[(r = s, l = function(t) {
var e, n, i, a = {};
for (e in t) if (t.hasOwnProperty(e)) {
n = t[e];
for (i in n) a[n[i]] = e;
}
return a;
}(d), l[r] || l.en)](c))] || a[0], i = o.replace(/^\s+|\s+$/g, "")) : i = t, i;
}
function n(t) {
e.console && e.console.warn && e.console.warn("WARNING: " + t);
}
t.VERSION = "0.4.3", t.prototype.locale = function(t) {
return t && (this.currentLocale = t), this.currentLocale;
}, t.prototype.extend = function(t, e) {
var n;
for (var i in t) t.hasOwnProperty(i) && (n = t[i], e && (i = e + "." + i), "object" == ("undefined" == typeof n ? "undefined" : o(n)) ? this.extend(n, i) : this.phrases[i] = n);
}, t.prototype.clear = function() {
this.phrases = {};
}, t.prototype.replace = function(t) {
this.clear(), this.extend(t);
}, t.prototype.t = function(t, e) {
var n, i;
return "number" == typeof (e = null == e ? {} : e) && (e = {
smart_count: e
}), "string" == typeof this.phrases[t] ? n = this.phrases[t] : "string" == typeof e._ ? n = e._ : this.allowMissing ? n = t : (this.warn('Missing translation for key: "' + t + '"'), 
i = t), "string" == typeof n && (e = function(t) {
var e = {};
for (var n in t) e[n] = t[n];
return e;
}(e), i = function(t, e) {
for (var n in e) "_" !== n && e.hasOwnProperty(n) && (t = t.replace(new RegExp("%\\{" + n + "\\}", "g"), e[n]));
return t;
}(i = a(n, this.currentLocale, e.smart_count), e)), i;
}, t.prototype.has = function(t) {
return t in this.phrases;
};
var u = "||||", h = {
chinese: function(t) {
return 0;
},
german: function(t) {
return 1 !== t ? 1 : 0;
},
french: function(t) {
return 1 < t ? 1 : 0;
},
russian: function(t) {
return t % 10 == 1 && t % 100 != 11 ? 0 : 2 <= t % 10 && t % 10 <= 4 && (t % 100 < 10 || 20 <= t % 100) ? 1 : 2;
},
czech: function(t) {
return 1 === t ? 0 : 2 <= t && t <= 4 ? 1 : 2;
},
polish: function(t) {
return 1 === t ? 0 : 2 <= t % 10 && t % 10 <= 4 && (t % 100 < 10 || 20 <= t % 100) ? 1 : 2;
},
icelandic: function(t) {
return t % 10 != 1 || t % 100 == 11 ? 1 : 0;
}
}, d = {
chinese: [ "fa", "id", "ja", "ko", "lo", "ms", "th", "tr", "zh" ],
german: [ "da", "de", "en", "es", "fi", "el", "he", "hu", "it", "nl", "no", "pt", "sv" ],
french: [ "fr", "tl", "pt-br" ],
russian: [ "hr", "ru" ],
czech: [ "cs" ],
polish: [ "pl" ],
icelandic: [ "is" ]
};
return t;
}, "function" == typeof define && define.amd ? define([], function() {
return a(i);
}) : "object" == ("undefined" == typeof n ? "undefined" : o(n)) ? e.exports = a(i) : i.Polyglot = a(i);
cc._RF.pop();
}, {} ],
putInIcons: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "1f4cdAOqcFF3L4Cx+6ylO5y", "putInIcons");
cc.Class({
extends: cc.Component,
properties: {
putDuration: 1,
putAudio: {
default: null,
type: cc.AudioSource
},
goldiconBox: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.posX = 0;
this.posY = 0;
},
putAction: function() {
var t = cc.moveTo(this.putDuration, cc.p(this.returnX(), this.returnY())), e = cc.callFunc(this.playSound, this);
return cc.sequence(t, e);
},
playSound: function() {
this.node.setPosition(cc.p(590, -310));
this.putAudio.play();
var t = new cc.Node("putgold");
t.addComponent(cc.Sprite).spriteFrame = this.node.getComponent(cc.Sprite).spriteFrame;
t.setPosition(cc.p(this.posX, this.posY));
t.setScale(.2, .2);
t.parent = this.goldiconBox;
},
startMoveAt: function() {
var t = Math.ceil(10 * Math.random()), e = Math.random();
this.node.runAction(this.putAction());
this.schedule(function() {
this.node.runAction(this.putAction());
}, e, t);
},
returnX: function() {
var t = [ -1 * (35 * Math.random() + 300), -1 * (50 * Math.random() + 250), -1 * (50 * Math.random() + 200), -1 * (60 * Math.random() + 140), -1 * (20 * Math.random() + 300), -1 * (20 * Math.random() + 250), 30 * Math.random() + 300, 50 * Math.random() + 250, 50 * Math.random() + 200, 55 * Math.random() + 145, 10 * Math.random() + 300, 30 * Math.random() + 250, 80 * Math.random() ], e = Math.round(12 * Math.random());
this.posX = t[e];
return t[e];
},
returnY: function() {
var t = [ 75 * Math.random(), -62 * Math.random() ], e = Math.round(1 * Math.random());
this.posY = t[e];
return t[e];
}
});
cc._RF.pop();
}, {} ],
startBtnClick: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "f87b74Y3yhBJKq8Y3MylsqJ", "startBtnClick");
var i = t("XMLHTTP");
cc.Class({
extends: cc.Component,
cotr: function() {},
properties: {
xhr: {
default: null,
type: i
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
onLoad: function() {
var t = JSON.parse(cc.sys.localStorage.getItem("userinfo"));
t.name && (this.loginuser.string = t.name);
},
showBtnbox: function() {
this.btnbox.active || (this.btnbox.active = !0);
},
closeBtnbox: function() {
this.btnbox.active = !1;
},
showLoginUi: function() {
this.closeRegisterUi();
this.loginboard.active = !0;
},
closeLoginUi: function() {
this.loginboard.active = !1;
},
showReisterUi: function() {
this.closeLoginUi();
this.registerboard.active = !0;
},
closeRegisterUi: function() {
this.registerboard.active = !1;
},
httpFail: function(t) {
var e = cc.find("Canvas/box/tankuangbg"), n = cc.find("Canvas/box/tankuangbg/msgtxt").getComponent(cc.Label);
e.active || (e.active = !0);
n.string = t;
e.getComponent(cc.Animation).play();
},
gustBtn: function() {
this.xhr.xmlHttpGet("api/guestLogin.do", "", "", this.loginSuccess, this.httpFail);
},
tanKuang: function(t) {
this.tankuangtxt.string = t;
this.tankuang.active = !0;
this.tankuang.getComponent(cc.Animation).play();
},
registerBtn: function() {
var t = this.reguser.string, e = this.regpass.string, n = this.regconfirmpass.string, i = parseInt(this.regtjren.string), a = "";
"" == t ? a = "请输入用户名" : t.length < 6 ? a = "帐号不能小于6位" : "" == e ? a = "请输入密码" : e.length < 6 ? a = "密码不能小于6位" : e != n ? a = "两次密码不一致" : (isNaN(i) || i <= 0) && (i = 0);
"" != a ? this.tanKuang(a) : this.xhr.xmlHttpPost("user/registered", {
parentId: i,
username: t,
password: e
}, "", this.loginSuccess, this.httpFail);
},
loginSuccess: function(t, e) {
if (0 == t.error) {
var n = t.data, i = {
utype: t.utype,
uid: n.uid,
type: n.type,
coin: n.coin,
name: n.username
};
cc.sys.localStorage.setItem("userinfo", JSON.stringify(i));
cc.sys.localStorage.setItem("userCookie", e.cookie);
cc.director.loadScene("Playgame");
} else {
var a = cc.find("Canvas/box/tankuangbg");
cc.find("Canvas/box/tankuangbg/msgtxt").getComponent(cc.Label).string = t.msg;
a.active || (a.active = !0);
a.getComponent(cc.Animation).play();
}
},
loginBtn: function() {
var t = this.loginuser.string, e = this.loginpass.string, n = "";
"" == t ? n = "请输入用户名" : t.length < 6 ? n = "帐号不能小于6位" : "" == e ? n = "请输入密码" : e.length < 6 && (n = "密码不能小于6位");
"" != n ? this.tanKuang(n) : this.xhr.xmlHttpPost("user/loginedto", {
username: t,
password: e
}, "", this.loginSuccess, this.httpFail);
}
});
cc._RF.pop();
}, {
XMLHTTP: "XMLHTTP"
} ],
startUi: [ function(t, e, n) {
"use strict";
cc._RF.push(e, "36ef3ZpQqNEPo6j+q6wqY3q", "startUi");
cc.Class({
extends: cc.Component,
properties: {
tanKuangNode: {
default: null,
type: cc.Node
}
},
onLoad: function() {
this.quitgame = 0;
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onDestroy: function() {
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
},
onKeyDown: function(t) {
switch (t.keyCode) {
case cc.KEY.back:
this.quitgame++;
}
},
onKeyUp: function(t) {
switch (t.keyCode) {
case cc.KEY.back:
if (2 <= this.quitgame) cc.director.end(); else {
this.tanKuangNode.active || (this.tanKuangNode.active = !0);
this.tanKuangNode.getChildByName("msgtxt").getComponent(cc.Label).string = "再按一次退出游戏";
this.tanKuangNode.getComponent(cc.Animation).play();
this.scheduleOnce(function() {
this.quitgame = 0;
}, 1);
}
}
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "LanguageData", "LocalizedLabel", "LocalizedSprite", "SpriteFrameSet", "polyglot.min", "XMLHTTP", "game", "gameBtnClick", "putInIcons", "startBtnClick", "startUi" ]);